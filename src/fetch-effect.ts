import { Effect, Schedule } from "effect";
import { UnknownException } from "effect/Cause";

/**
 * Options for the httpFetch function.
 * @property retries - The number of retries to attempt. Defaults to 3.
 */
export interface HttpFetchOptions extends RequestInit {
	retries?: number;
}

export function httpFetch(url: string, options: HttpFetchOptions = {}) {
	return Effect.gen(function* () {
		return yield* Effect.retry(
			Effect.tryPromise(() => fetch(url, options)),
			retryPolicy(options.retries ?? 3),
		);
	});
}

const retryPolicy = (retries: number) =>
	Schedule.intersect(
		Schedule.jittered(Schedule.exponential("300 millis")),
		Schedule.recurs(retries),
	).pipe(
		Schedule.whileInput((err) => {
			return !(
				err instanceof UnknownException &&
				err.error instanceof DOMException &&
				err.error.name === "AbortError"
			);
		}),
	);
