import { Effect } from "effect";

import { ApiError } from "./errors.js";
import type { SecretsApi } from "./types.js";

const notImplemented = <T>(operation: string): Effect.Effect<T, ApiError> =>
	Effect.fail(
		new ApiError({
			message: `${operation} is not implemented yet`,
		}),
	);

export const createSecretsApi = (): SecretsApi => ({
	set: () => notImplemented("secrets.set"),
	setPromise: () => Effect.runPromise(notImplemented("secrets.set")),
	list: () => notImplemented("secrets.list"),
	listPromise: () => Effect.runPromise(notImplemented("secrets.list")),
});
