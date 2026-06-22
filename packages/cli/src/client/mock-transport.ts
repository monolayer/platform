import { Effect } from "effect";

import { TransportError } from "./errors.js";
import type { HttpRequest, HttpResponse, Transport } from "./transport.js";
import type { DeploymentDto, EnvironmentVariableDto, ListResult, ProjectDto } from "./types.js";

const initialProjects: ReadonlyArray<ProjectDto> = [
  {
    projectId: "proj-1",
    name: "Control Plane",
    repositoryUrl: "https://github.com/monolayer/control-plane",
  },
  {
    projectId: "proj-2",
    name: "Workflow Engine",
    repositoryUrl: "https://github.com/monolayer/workflow-engine",
  },
  {
    projectId: "proj-3",
    name: "Infra Agent",
    repositoryUrl: "https://github.com/monolayer/infra-agent",
  },
];

const initialDeployments: ReadonlyArray<DeploymentDto> = [
  {
    deploymentId: "dep-1",
    projectId: "proj-1",
    environmentId: "prod",
    sourceRef: "main",
    status: "succeeded",
    createdAt: "2026-02-10T10:00:00.000Z",
  },
  {
    deploymentId: "dep-2",
    projectId: "proj-1",
    environmentId: "staging",
    sourceRef: "feature/a",
    status: "running",
    createdAt: "2026-02-12T18:30:00.000Z",
  },
  {
    deploymentId: "dep-3",
    projectId: "proj-2",
    environmentId: "prod",
    sourceRef: "main",
    status: "queued",
    createdAt: "2026-02-16T11:10:00.000Z",
  },
];

const initialEnvironmentVariables: ReadonlyArray<EnvironmentVariableDto> = [
  {
    name: "API_KEY",
    value: "mock-secret-value",
    environment: "production",
    updatedAt: "2026-02-10T10:00:00.000Z",
  },
  {
    name: "DEBUG",
    value: "1",
    environment: "preview",
    updatedAt: "2026-02-12T18:30:00.000Z",
  },
];

const initialBranchTracking: Record<
  string,
  {
    production: boolean;
    preview: boolean;
    branches: Array<{ name: string; enabled: boolean }>;
  }
> = {
  "proj-1": {
    production: true,
    preview: true,
    branches: [{ name: "feature-a", enabled: false }],
  },
  "proj-2": {
    production: true,
    preview: false,
    branches: [],
  },
};

const toNumber = (
  value: string | number | boolean | undefined,
  defaultValue: number,
): number => {
  if (typeof value === "number") return value;
  if (typeof value === "boolean" || value === undefined) return defaultValue;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? defaultValue : parsed;
};

const paginate = <T>(
  items: ReadonlyArray<T>,
  cursor: string | number | boolean | undefined,
  limitValue: string | number | boolean | undefined,
): ListResult<T> => {
  const start = Math.max(0, toNumber(cursor, 0));
  const limit = Math.max(1, toNumber(limitValue, 50));
  const pagedItems = items.slice(start, start + limit);
  const nextOffset = start + limit;

  if (nextOffset >= items.length) {
    return { items: pagedItems };
  }

  return {
    items: pagedItems,
    nextCursor: `${nextOffset}`,
  };
};

const unauthorized = (): HttpResponse => ({
  status: 401,
  body: {
    message: "Missing or invalid authorization header",
  },
});

const validateAuth = (request: HttpRequest): boolean => {
  const authorization = request.headers?.authorization;
  return (
    typeof authorization === "string" && authorization.startsWith("Bearer ")
  );
};

const notFound = (message: string): HttpResponse => ({
  status: 404,
  body: { message },
});

export const createMockTransport = (): Transport => {
  const projects = [...initialProjects];
  const deployments = [...initialDeployments];
  const environmentVariables = [...initialEnvironmentVariables];
  const branchTracking = JSON.parse(JSON.stringify(initialBranchTracking)) as Record<
    string,
    {
      production: boolean;
      preview: boolean;
      branches: Array<{ name: string; enabled: boolean }>;
    }
  >;
  let deploymentSequence = deployments.length;

  return (request) =>
    Effect.try({
      try: () => {
        if (!validateAuth(request)) {
          return unauthorized();
        }

        if (request.method === "GET" && request.path === "/sdk/projects") {
          return {
            status: 200,
            body: paginate(
              projects,
              request.query?.cursor,
              request.query?.limit,
            ),
          };
        }

        if (request.method === "GET" && request.path === "/sdk/deployments") {
          const projectId = request.query?.projectId;
          const filtered =
            typeof projectId === "string"
              ? deployments.filter(
                  (deployment) => deployment.projectId === projectId,
                )
              : deployments;

          return {
            status: 200,
            body: paginate(
              filtered,
              request.query?.cursor,
              request.query?.limit,
            ),
          };
        }

        const getDeploymentMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/deployments\/([^/]+)$/,
        );
        if (request.method === "GET" && getDeploymentMatch) {
          const projectId = decodeURIComponent(getDeploymentMatch[1] ?? "");
          const deploymentId = decodeURIComponent(getDeploymentMatch[2] ?? "");
          const deployment = deployments.find(
            (item) =>
              item.deploymentId === deploymentId &&
              item.projectId === projectId,
          );

          if (!deployment) {
            return notFound(
              `Deployment not found: ${deploymentId} for project ${projectId}`,
            );
          }

          return {
            status: 200,
            body: deployment,
          };
        }

        if (request.method === "POST" && request.path === "/sdk/deployments") {
          const body =
            typeof request.body === "object" && request.body !== null
              ? request.body
              : undefined;
          const projectId =
            body &&
            "projectId" in body &&
            typeof body.projectId === "string" &&
            body.projectId.trim().length > 0
              ? body.projectId
              : undefined;

          if (!projectId) {
            return {
              status: 400,
              body: { message: "projectId is required" },
            };
          }

          const newDeployment: DeploymentDto = {
            deploymentId: `dep-${++deploymentSequence}`,
            projectId,
            environmentId:
              body &&
              "environmentId" in body &&
              typeof body.environmentId === "string"
                ? body.environmentId
                : undefined,
            sourceRef:
              body && "sourceRef" in body && typeof body.sourceRef === "string"
                ? body.sourceRef
                : undefined,
            status: "queued",
            createdAt: "2026-02-18T00:00:00.000Z",
          };

          deployments.unshift(newDeployment);
          return {
            status: 201,
            body: newDeployment,
          };
        }

        const listEnvMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/environment-variables$/,
        );
        if (request.method === "GET" && listEnvMatch) {
          const projectId = decodeURIComponent(listEnvMatch[1] ?? "");
          const projectExists = projects.some((p) => p.projectId === projectId);
          if (!projectExists) {
            return notFound(`Project not found: ${projectId}`);
          }
          return {
            status: 200,
            body: {
              items: environmentVariables,
            },
          };
        }

        const createEnvMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/environment-variables$/,
        );
        if (request.method === "POST" && createEnvMatch) {
          const projectId = decodeURIComponent(createEnvMatch[1] ?? "");
          const projectExists = projects.some((p) => p.projectId === projectId);
          if (!projectExists) {
            return notFound(`Project not found: ${projectId}`);
          }
          const body =
            typeof request.body === "object" && request.body !== null
              ? request.body
              : undefined;
          const key = body && "key" in body && typeof body.key === "string" ? body.key : undefined;
          const value = body && "value" in body && typeof body.value === "string" ? body.value : undefined;
          const environment = body && "environment" in body && typeof body.environment === "string" ? body.environment : undefined;

          if (!key || !value || !environment) {
            return {
              status: 400,
              body: { message: "key, value, and environment are required" },
            };
          }

          const newVar: EnvironmentVariableDto = {
            name: key,
            value,
            environment,
            updatedAt: new Date().toISOString(),
          };

          environmentVariables.push(newVar);
          return {
            status: 201,
            body: newVar,
          };
        }

        const deleteEnvMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/environment-variables\/([^/]+)$/,
        );
        if (request.method === "DELETE" && deleteEnvMatch) {
          const projectId = decodeURIComponent(deleteEnvMatch[1] ?? "");
          const name = decodeURIComponent(deleteEnvMatch[2] ?? "");
          const environmentName = request.query?.environmentName;

          const projectExists = projects.some((p) => p.projectId === projectId);
          if (!projectExists) {
            return notFound(`Project not found: ${projectId}`);
          }

          if (typeof environmentName !== "string") {
            return {
              status: 400,
              body: { message: "environmentName is required" },
            };
          }

          const index = environmentVariables.findIndex(
            (v) => v.name === name && v.environment === environmentName,
          );

          if (index === -1) {
            return notFound(`Environment variable not found: ${name} for environment ${environmentName}`);
          }

          environmentVariables.splice(index, 1);
          return {
            status: 200,
            body: { success: true },
          };
        }

        const getBtMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/branch-tracking$/,
        );
        if (request.method === "GET" && getBtMatch) {
          const projectId = decodeURIComponent(getBtMatch[1] ?? "");
          const projectExists = projects.some((p) => p.projectId === projectId);
          if (!projectExists) {
            return notFound(`Project not found: ${projectId}`);
          }
          const config = branchTracking[projectId] ?? {
            production: true,
            preview: true,
            branches: [],
          };
          return {
            status: 200,
            body: {
              production: config.production,
              preview: config.preview,
              branches: config.branches.map((b) => ({
                [b.name]: b.enabled,
              })),
            },
          };
        }

        const putBtMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/branch-tracking$/,
        );
        if (request.method === "PUT" && putBtMatch) {
          const projectId = decodeURIComponent(putBtMatch[1] ?? "");
          const projectExists = projects.some((p) => p.projectId === projectId);
          if (!projectExists) {
            return notFound(`Project not found: ${projectId}`);
          }
          const body =
            typeof request.body === "object" && request.body !== null
              ? request.body
              : undefined;
          const branch = body && "branch" in body && typeof body.branch === "string" ? body.branch : undefined;
          const enabled = body && "enabled" in body && typeof body.enabled === "boolean" ? body.enabled : undefined;

          if (!branch || enabled === undefined) {
            return {
              status: 400,
              body: { message: "branch and enabled are required" },
            };
          }

          if (!branchTracking[projectId]) {
            branchTracking[projectId] = {
              production: true,
              preview: true,
              branches: [],
            };
          }

          const config = branchTracking[projectId]!;
          if (branch === "production") {
            config.production = enabled;
          } else if (branch === "preview") {
            config.preview = enabled;
          } else {
            const index = config.branches.findIndex((b) => b.name === branch);
            if (index >= 0) {
              const currentBranches = [...config.branches];
              currentBranches[index] = { name: branch, enabled };
              config.branches = currentBranches;
            } else {
              config.branches = [...config.branches, { name: branch, enabled }];
            }
          }

          return {
            status: 200,
            body: { success: true },
          };
        }

        const deleteBtMatch = request.path.match(
          /^\/sdk\/projects\/([^/]+)\/branch-tracking\/([^/]+)$/,
        );
        if (request.method === "DELETE" && deleteBtMatch) {
          const projectId = decodeURIComponent(deleteBtMatch[1] ?? "");
          const branch = decodeURIComponent(deleteBtMatch[2] ?? "");

          const projectExists = projects.some((p) => p.projectId === projectId);
          if (!projectExists) {
            return notFound(`Project not found: ${projectId}`);
          }

          if (branch !== "production" && branch !== "preview") {
            const config = branchTracking[projectId];
            if (config) {
              config.branches = config.branches.filter((b) => b.name !== branch);
            }
          }

          return {
            status: 200,
            body: { success: true },
          };
        }

        return notFound(
          `Route not implemented in mock transport: ${request.method} ${request.path}`,
        );
      },
      catch: (cause) =>
        new TransportError({
          message:
            cause instanceof Error
              ? cause.message
              : "Unexpected mock transport failure",
        }),
    });
};
