import { Effect } from "effect";
import { startContainer, stopContainer } from "~/containers/admin/container.js";
import { updateDotenvFile } from "~/containers/admin/update-dotenv-file.js";
import type { StatefulWorkload } from "~/workloads/stateful/stateful-workload.js";
import { ApiError } from "./errors.js";
import type { ClientRuntime } from "./runtime.js";
import type {
	LocalApi,
	StartWorkloadInput,
	StopWorkloadInput,
} from "./types.js";

export const createLocalApi = (_runtime: ClientRuntime): LocalApi => {
	const start = (input: StartWorkloadInput) =>
		Effect.tryPromise({
			try: async () => {
				await startContainer(input.workload, {
					mode: input.mode,
					waitForHealthcheck: input.waitForHealthcheck,
				});

				// Check if the workload has a connectionStringEnvVar property
				if ("connectionStringEnvVar" in input.workload) {
					const workload = input.workload as StatefulWorkload & {
						connectionStringEnvVar: string;
					};
					const name = workload.connectionStringEnvVar;
					const value = process.env[name];

					if (value) {
						await updateDotenvFile(
							[
								{
									name,
									value,
								},
							],
							input.mode,
						);
					}
				}
			},
			catch: (error) => new ApiError({ message: String(error) }),
		});

	const stop = (input: StopWorkloadInput) =>
		Effect.tryPromise({
			try: async () => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				await stopContainer(input.workload as any, input.mode);
			},
			catch: (error) => new ApiError({ message: String(error) }),
		});

	return {
		start,
		startPromise: (input) => Effect.runPromise(start(input)),
		stop,
		stopPromise: (input) => Effect.runPromise(stop(input)),
	};
};
