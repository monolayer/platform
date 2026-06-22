import { Effect } from "effect";

import { sendJson } from "./request.js";
import type { ClientRuntime } from "./runtime.js";
import type {
	BranchTrackingApi,
	BranchTrackingDto,
	DeleteBranchTrackingInput,
	GetBranchTrackingInput,
	UpsertBranchTrackingInput,
} from "./types.js";

export const createBranchTrackingApi = (
	runtime: ClientRuntime,
): BranchTrackingApi => {
	const get = (input: GetBranchTrackingInput) =>
		sendJson<BranchTrackingDto>(runtime, {
			method: "GET",
			path: `/sdk/projects/${input.projectId}/branch-tracking`,
		});

	const upsert = (input: UpsertBranchTrackingInput) =>
		sendJson<{ readonly success: true }>(runtime, {
			method: "PUT",
			path: `/sdk/projects/${input.projectId}/branch-tracking`,
			body: {
				branch: input.branch,
				enabled: input.enabled,
			},
		});

	const delete_ = (input: DeleteBranchTrackingInput) =>
		sendJson<{ readonly success: true }>(runtime, {
			method: "DELETE",
			path: `/sdk/projects/${input.projectId}/branch-tracking/${input.branch}`,
		});

	return {
		get,
		getPromise: (input: GetBranchTrackingInput) =>
			Effect.runPromise(get(input)),
		upsert,
		upsertPromise: (input: UpsertBranchTrackingInput) =>
			Effect.runPromise(upsert(input)),
		delete: delete_,
		deletePromise: (input: DeleteBranchTrackingInput) =>
			Effect.runPromise(delete_(input)),
	};
};
