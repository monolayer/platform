import { Effect } from "effect";

import { sendJson } from "./request.js";
import type { ClientRuntime } from "./runtime.js";
import type {
	CreateDeploymentInput,
	DeploymentDto,
	DeploymentsApi,
	GetDeploymentInput,
	ListDeploymentsInput,
	ListResult,
} from "./types.js";

export const createDeploymentsApi = (
	runtime: ClientRuntime,
): DeploymentsApi => {
	const create = (input: CreateDeploymentInput) => {
		console.dir(input);
		return sendJson<DeploymentDto>(runtime, {
			method: "POST",
			path: "/sdk/deployments",
			body: input,
		});
	};

	const get = (input: GetDeploymentInput) =>
		sendJson<DeploymentDto>(runtime, {
			method: "GET",
			path: `/sdk/projects/${encodeURIComponent(input.projectId)}/deployments/${encodeURIComponent(input.deploymentId)}`,
		});

	const list = (input?: ListDeploymentsInput) =>
		sendJson<ListResult<DeploymentDto>>(runtime, {
			method: "GET",
			path: "/sdk/deployments",
			query: {
				projectId: input?.projectId,
				cursor: input?.cursor,
				limit: input?.limit,
			},
		});

	return {
		create,
		createPromise: (input: CreateDeploymentInput) =>
			Effect.runPromise(create(input)),
		get,
		getPromise: (input: GetDeploymentInput) => Effect.runPromise(get(input)),
		list,
		listPromise: (input?: ListDeploymentsInput) =>
			Effect.runPromise(list(input)),
	};
};
