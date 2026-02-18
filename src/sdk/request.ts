import { Effect } from "effect";

import {
	ApiError,
	AuthError,
	NotFoundError,
	RateLimitError,
	ValidationError,
	type SdkError,
} from "./errors.js";
import type { ClientRuntime } from "./runtime.js";
import type { HttpRequest } from "./transport.js";

const toSdkError = (status: number, body: unknown, requestId?: string): SdkError => {
	const message =
		typeof body === "object" &&
		body !== null &&
		"message" in body &&
		typeof body.message === "string"
			? body.message
			: `Request failed with status ${status}`;

	if (status === 401 || status === 403) {
		return new AuthError({ message });
	}

	if (status === 400) {
		return new ValidationError({ message });
	}

	if (status === 404) {
		return new NotFoundError({ message, statusCode: status });
	}

	if (status === 429) {
		return new RateLimitError({ message, statusCode: status });
	}

	return new ApiError({
		message,
		statusCode: status,
		requestId,
	});
};

export const sendJson = <T>(
	runtime: ClientRuntime,
	request: Omit<HttpRequest, "headers">,
): Effect.Effect<T, SdkError> =>
	Effect.gen(function* () {
		const response = yield* runtime.transport({
			...request,
			headers: {
				authorization: `Bearer ${runtime.authToken}`,
			},
		});

		if (response.status >= 200 && response.status < 300) {
			return response.body as T;
		}

		return yield* Effect.fail(
			toSdkError(response.status, response.body, response.headers?.["x-request-id"]),
		);
	});
