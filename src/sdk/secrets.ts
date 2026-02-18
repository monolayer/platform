import { Effect } from "effect";

import { sendJson } from "./request.js";
import type { ClientRuntime } from "./runtime.js";
import type {
	ListResult,
	ListSecretsInput,
	SecretDto,
	SecretsApi,
	SetSecretInput,
} from "./types.js";

export const createSecretsApi = (runtime: ClientRuntime): SecretsApi => {
	const set = (input: SetSecretInput) =>
		sendJson<SecretDto>(runtime, {
			method: "PUT",
			path: `/v1/projects/${encodeURIComponent(input.projectId)}/secrets/${encodeURIComponent(input.key)}`,
			body: {
				value: input.value,
			},
		});

	const list = (input: ListSecretsInput) =>
		sendJson<ListResult<SecretDto>>(runtime, {
			method: "GET",
			path: `/v1/projects/${encodeURIComponent(input.projectId)}/secrets`,
			query: {
				cursor: input.cursor,
				limit: input.limit,
			},
		});

	return {
		set,
		setPromise: (input: SetSecretInput) => Effect.runPromise(set(input)),
		list,
		listPromise: (input: ListSecretsInput) => Effect.runPromise(list(input)),
	};
};
