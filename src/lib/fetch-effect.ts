import { Effect, Schedule } from "effect";

/**
 * Options for the httpFetch function.
 * @property retries - The number of retries to attempt. Defaults to 3.
 */
export interface HttpFetchOptions extends RequestInit {
	retries?: number;
}

class UnsuccessfulResponseError extends Error {
	cause: Response;

	constructor(response: Response) {
		super("Unsuccessful response");
		this.cause = response;
	}
}

export function httpFetch(url: string, options: HttpFetchOptions = {}) {
	return Effect.gen(function* () {
		return yield* Effect.retry(
			Effect.tryPromise({
				try: async () => {
					const response = await fetch(url, options);
					if (!response.ok) {
						throw new UnsuccessfulResponseError(response);
					}
					return response;
				},
				catch: (error): UnsuccessfulResponseError | Error | DOMException => {
					if (isAbortError(error)) return error;
					if (error instanceof UnsuccessfulResponseError) return error;
					return new Error(`Something went wrong`);
				},
			}),
			retryPolicy(options.retries ?? 3),
		);
	});
}

const retryPolicy = (retries: number) =>
	Schedule.intersect(
		Schedule.jittered(Schedule.exponential("300 millis")),
		Schedule.recurs(retries),
	).pipe(Schedule.whileInput((err) => !isAbortError(err)));

function isAbortError(err: unknown): err is DOMException {
	return err instanceof DOMException && err.name === "AbortError";
}
