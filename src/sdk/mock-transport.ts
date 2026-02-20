import { Effect } from "effect";

import { TransportError } from "./errors.js";
import type {
	DeploymentDto,
	ListResult,
	ProjectDto,
	SecretDto,
} from "./types.js";
import type { HttpRequest, HttpResponse, Transport } from "./transport.js";

const initialProjects: ReadonlyArray<ProjectDto> = [
	{ projectId: "proj-1", name: "Control Plane" },
	{ projectId: "proj-2", name: "Workflow Engine" },
	{ projectId: "proj-3", name: "Infra Agent" },
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

const initialSecrets: ReadonlyArray<SecretDto> = [
	{
		projectId: "proj-1",
		key: "DATABASE_URL",
		updatedAt: "2026-02-14T00:00:00.000Z",
		version: 2,
	},
	{
		projectId: "proj-1",
		key: "SENTRY_DSN",
		updatedAt: "2026-02-15T00:00:00.000Z",
		version: 1,
	},
	{
		projectId: "proj-2",
		key: "API_KEY",
		updatedAt: "2026-02-16T00:00:00.000Z",
		version: 3,
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
	const secrets = new Map<string, SecretDto>();
	let deploymentSequence = deployments.length;

	for (const secret of initialSecrets) {
		secrets.set(`${secret.projectId}:${secret.key}`, secret);
	}

	return (request) =>
		Effect.try({
			try: () => {
				if (!validateAuth(request)) {
					return unauthorized();
				}

				if (request.method === "GET" && request.path === "/v1/projects") {
					return {
						status: 200,
						body: paginate(
							projects,
							request.query?.cursor,
							request.query?.limit,
						),
					};
				}

				if (request.method === "GET" && request.path === "/v1/deployments") {
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

				if (
					request.method === "GET" &&
					request.path.startsWith("/v1/deployments/")
				) {
					const deploymentId = decodeURIComponent(
						request.path.replace("/v1/deployments/", ""),
					);
					const deployment = deployments.find(
						(item) => item.deploymentId === deploymentId,
					);

					if (!deployment) {
						return notFound(`Deployment not found: ${deploymentId}`);
					}

					return {
						status: 200,
						body: deployment,
					};
				}

				if (request.method === "POST" && request.path === "/v1/deployments") {
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

				const projectSecretsMatch = request.path.match(
					/^\/v1\/projects\/([^/]+)\/secrets$/,
				);
				if (request.method === "GET" && projectSecretsMatch) {
					const projectId = decodeURIComponent(projectSecretsMatch[1] ?? "");
					const projectSecrets = [...secrets.values()].filter(
						(secret) => secret.projectId === projectId,
					);
					return {
						status: 200,
						body: paginate(
							projectSecrets,
							request.query?.cursor,
							request.query?.limit,
						),
					};
				}

				const setSecretMatch = request.path.match(
					/^\/v1\/projects\/([^/]+)\/secrets\/([^/]+)$/,
				);
				if (request.method === "PUT" && setSecretMatch) {
					const projectId = decodeURIComponent(setSecretMatch[1] ?? "");
					const key = decodeURIComponent(setSecretMatch[2] ?? "");

					const body =
						typeof request.body === "object" && request.body !== null
							? request.body
							: undefined;
					const value =
						body &&
						"value" in body &&
						typeof body.value === "string" &&
						body.value.length > 0
							? body.value
							: undefined;

					if (!value) {
						return {
							status: 400,
							body: { message: "Secret value is required" },
						};
					}

					const existing = secrets.get(`${projectId}:${key}`);
					const updated: SecretDto = {
						projectId,
						key,
						updatedAt: "2026-02-18T00:00:00.000Z",
						version: existing ? existing.version + 1 : 1,
					};
					secrets.set(`${projectId}:${key}`, updated);

					return {
						status: 200,
						body: updated,
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
