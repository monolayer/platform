import { Effect } from "effect";

import { sendJson } from "./request.js";
import type { ClientRuntime } from "./runtime.js";
import type {
	CreateEnvironmentVariableInput,
	DeleteEnvironmentVariableInput,
	EnvironmentVariableDto,
	EnvironmentVariablesApi,
	ListEnvironmentVariablesInput,
	ListResult,
} from "./types.js";

export const createEnvironmentVariablesApi = (
	runtime: ClientRuntime,
): EnvironmentVariablesApi => {
	const list = (input: ListEnvironmentVariablesInput) =>
		sendJson<ListResult<EnvironmentVariableDto>>(runtime, {
			method: "GET",
			path: `/sdk/projects/${input.projectId}/environment-variables`,
		});

	const create = (input: CreateEnvironmentVariableInput) =>
		sendJson<EnvironmentVariableDto>(runtime, {
			method: "POST",
			path: `/sdk/projects/${input.projectId}/environment-variables`,
			body: {
				key: input.key,
				value: input.value,
				environment: input.environment,
			},
		});

	const delete_ = (input: DeleteEnvironmentVariableInput) =>
		sendJson<{ readonly success: true }>(runtime, {
			method: "DELETE",
			path: `/sdk/projects/${input.projectId}/environment-variables/${input.name}`,
			query: {
				environmentName: input.environmentName,
			},
		});

	return {
		list,
		listPromise: (input: ListEnvironmentVariablesInput) =>
			Effect.runPromise(list(input)),
		create,
		createPromise: (input: CreateEnvironmentVariableInput) =>
			Effect.runPromise(create(input)),
		delete: delete_,
		deletePromise: (input: DeleteEnvironmentVariableInput) =>
			Effect.runPromise(delete_(input)),
	};
};
