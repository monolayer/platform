import { Effect } from "effect";

import { TransportError } from "./errors.js";
import type { HttpRequest, HttpResponse, Transport } from "./transport.js";
import type { DeploymentDto, ListResult, ProjectDto } from "./types.js";

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
