import { Command, Flags } from "@oclif/core";
import { execFileSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

type TriggeredDeploymentResponse = {
  readonly type: "triggered";
  readonly success: true;
  readonly deploymentNumber: string;
  readonly queued: false;
};

type QueuedDeploymentResponse = {
  readonly type: "queued";
  readonly success: true;
  readonly queued: true;
};

type SkippedDeploymentResponse = {
  readonly type: "skipped";
  readonly success: false;
  readonly message: string;
};

type DeploymentTriggerResponse =
  | TriggeredDeploymentResponse
  | QueuedDeploymentResponse
  | SkippedDeploymentResponse;

type DeploymentStatus =
  | "Queued"
  | "Ongoing"
  | "Finished"
  | "Failed"
  | "Unknown";

type DeploymentLog = {
  readonly message: string;
  readonly timestamp: number;
  readonly logGroupName: string;
  readonly logStreamName: string;
  readonly ingestionTime?: number;
  readonly eventId?: string;
};

type DeploymentProgressResponse = {
  readonly status: DeploymentStatus;
  readonly logs: ReadonlyArray<DeploymentLog>;
};

type DeployCommandResult = {
  readonly branchName: string;
  readonly trigger: DeploymentTriggerResponse;
  readonly status?: DeploymentStatus;
  readonly logs: ReadonlyArray<DeploymentLog>;
};

type JsonRequestResult<T> = {
  readonly status: number;
  readonly headers: Headers;
  readonly body: T;
};

const hasInvalidBranchPrefix = (branchName: string): boolean =>
  branchName.startsWith("refs/heads/") || branchName.startsWith("branch/");

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : undefined;

const resolveErrorMessage = (body: unknown, fallback: string): string => {
  const bodyRecord = asRecord(body);
  if (bodyRecord && typeof bodyRecord.error === "string") {
    return bodyRecord.error;
  }
  if (bodyRecord && typeof bodyRecord.message === "string") {
    return bodyRecord.message;
  }
  return fallback;
};

const formatLogLine = (log: DeploymentLog): string =>
  `[${new Date(log.timestamp).toISOString()}] ${log.message}`;

const redactToken = (token: string): string => {
  if (token.length <= 8) {
    return "***";
  }

  return `${token.slice(0, 4)}...${token.slice(-4)}`;
};

const isRequestDebugEnabled = (): boolean => {
  // oxlint-disable-next-line turbo/no-undeclared-env-vars
  return process.env.DEBUG === "1";
};

export default class DeploymentsDeploy extends Command {
  static summary = "Deploy the current git branch";
  static description =
    "Triggers SDK deployment for the current git branch and polls deployment logs.";
  static enableJsonFlag = true;

  static examples = [
    "<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --deployment-token deploy_token_... --project-id proj-1",
    "<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --deployment-token deploy_token_... --project-id proj-1 --branch-name feature/x",
    "<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --deployment-token deploy_token_... --project-id proj-1 --json",
  ];

  static flags = {
    "base-url": Flags.string({
      required: true,
      env: "MONOLAYER_BASE_URL",
      summary: "Control plane API base origin",
    }),
    "deployment-token": Flags.string({
      required: true,
      env: "MONOLAYER_DEPLOYMENT_TOKEN",
      summary: "Deployment token (deploy_token_*)",
    }),
    "project-id": Flags.string({
      required: true,
      summary: "Project identifier used for deployment polling",
    }),
    "branch-name": Flags.string({
      summary:
        "Branch name to deploy (when omitted, uses current git branch automatically)",
    }),
    "poll-interval-ms": Flags.integer({
      default: 2000,
      min: 0,
      summary: "Polling interval in milliseconds",
    }),
  };

  public async run(): Promise<DeployCommandResult> {
    const { flags } = await this.parse(DeploymentsDeploy);
    const baseUrl = new URL(flags["base-url"]);
    const deploymentToken = flags["deployment-token"];
    const jsonOutput = flags.json ?? false;

    if (!deploymentToken.startsWith("deploy_token_")) {
      this.error('deployment-token must start with "deploy_token_"', {
        exit: 1,
      });
    }

    const branchName = flags["branch-name"] ?? this.getCurrentBranchName();
    if (hasInvalidBranchPrefix(branchName)) {
      this.error(
        'Current branch must be a raw branch name (no "refs/heads/" or "branch/" prefix).',
        { exit: 1 },
      );
    }

    if (!jsonOutput) {
      this.log(`Current branch: ${branchName}`);
    }

    const triggerResponse =
      await this.sendJsonRequest<DeploymentTriggerResponse>(
        new URL("/sdk/deployments", baseUrl),
        {
          method: "POST",
          deploymentToken,
          body: { branchName },
        },
      );

    if (triggerResponse.body.type === "skipped") {
      if (!jsonOutput) {
        this.log(`Deployment skipped: ${triggerResponse.body.message}`);
      }
      return {
        branchName,
        trigger: triggerResponse.body,
        logs: [],
      };
    }

    if (triggerResponse.body.type === "queued") {
      if (!jsonOutput) {
        this.log("Deployment already queued. Polling skipped.");
      }
      return {
        branchName,
        trigger: triggerResponse.body,
        status: "Queued",
        logs: [],
      };
    }

    if (!jsonOutput) {
      this.log(
        `Deployment triggered: ${triggerResponse.body.deploymentNumber}. Polling logs...`,
      );
    }

    const pollResult = await this.pollDeployment({
      baseUrl,
      projectId: flags["project-id"],
      deploymentNumber: triggerResponse.body.deploymentNumber,
      deploymentToken,
      pollIntervalMs: flags["poll-interval-ms"],
      jsonOutput,
    });

    if (pollResult.status === "Failed") {
      this.error(
        `Deployment ${triggerResponse.body.deploymentNumber} failed.`,
        { exit: 1 },
      );
    }

    return {
      branchName,
      trigger: triggerResponse.body,
      status: pollResult.status,
      logs: pollResult.logs,
    };
  }

  private getCurrentBranchName(): string {
    let rawBranchName = "";
    try {
      rawBranchName = execFileSync("git", ["branch", "--show-current"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
    } catch {
      this.error(
        "Unable to determine current git branch. Run this command inside a git repository or pass --branch-name.",
        { exit: 1 },
      );
    }

    if (rawBranchName.length === 0) {
      this.error(
        "Unable to determine current git branch. Ensure HEAD points to a branch or pass --branch-name.",
        { exit: 1 },
      );
    }

    return rawBranchName;
  }

  private async pollDeployment(input: {
    readonly baseUrl: URL;
    readonly projectId: string;
    readonly deploymentNumber: string;
    readonly deploymentToken: string;
    readonly pollIntervalMs: number;
    readonly jsonOutput: boolean;
  }): Promise<{
    readonly status: DeploymentStatus;
    readonly logs: DeploymentLog[];
  }> {
    const collectedLogs: DeploymentLog[] = [];
    const seenLogKeys = new Set<string>();
    let since: string | undefined;

    for (;;) {
      const pollUrl = new URL(
        `/sdk/projects/${encodeURIComponent(input.projectId)}/deployments/${encodeURIComponent(input.deploymentNumber)}`,
        input.baseUrl,
      );
      if (since !== undefined) {
        pollUrl.searchParams.set("since", since);
      }

      const response = await this.sendJsonRequest<DeploymentProgressResponse>(
        pollUrl,
        {
          method: "GET",
          deploymentToken: input.deploymentToken,
        },
      );

      const freshLogs: DeploymentLog[] = [];
      for (const log of response.body.logs) {
        const key =
          log.eventId ??
          `${log.timestamp}:${log.logGroupName}:${log.logStreamName}:${log.message}`;
        if (seenLogKeys.has(key)) {
          continue;
        }
        seenLogKeys.add(key);
        freshLogs.push(log);
      }

      collectedLogs.push(...freshLogs);

      if (!input.jsonOutput) {
        for (const log of freshLogs) {
          this.log(formatLogLine(log));
        }
        this.log(`Deployment status: ${response.body.status}`);
      }

      if (
        response.body.status === "Finished" ||
        response.body.status === "Failed" ||
        response.body.status === "Queued"
      ) {
        return {
          status: response.body.status,
          logs: collectedLogs,
        };
      }

      const nextSince = response.headers.get("x-next-since");
      if (nextSince && nextSince.trim().length > 0) {
        since = nextSince.trim();
      }

      if (input.pollIntervalMs > 0) {
        await delay(input.pollIntervalMs);
      }
    }
  }

  private async sendJsonRequest<T>(
    url: URL,
    input: {
      readonly method: "GET" | "POST";
      readonly deploymentToken: string;
      readonly body?: unknown;
    },
  ): Promise<JsonRequestResult<T>> {
    const requestHeaders: Record<string, string> = {
      authorization: `Bearer ${input.deploymentToken}`,
      ...(input.body === undefined
        ? {}
        : {
            "content-type": "application/json",
          }),
    };

    if (isRequestDebugEnabled()) {
      console.debug("[deployments:deploy] sendJsonRequest", {
        method: input.method,
        url: url.toString(),
        headers: {
          ...requestHeaders,
          authorization: `Bearer ${redactToken(input.deploymentToken)}`,
        },
        body: input.body,
      });
    }

    const response = await fetch(url, {
      method: input.method,
      headers: requestHeaders,
      body: input.body === undefined ? undefined : JSON.stringify(input.body),
    });

    const responseText = await response.text();
    let responseBody: unknown = undefined;
    if (responseText.length > 0) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        responseBody = responseText;
      }
    }

    if (!response.ok) {
      this.error(
        `${response.status} ${resolveErrorMessage(
          responseBody,
          `Request failed for ${input.method} ${url.pathname}`,
        )}`,
        { exit: 1 },
      );
    }

    return {
      status: response.status,
      headers: response.headers,
      body: responseBody as T,
    };
  }
}
