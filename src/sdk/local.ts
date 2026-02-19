import { Effect } from "effect";
import { startContainer } from "~/containers/admin/container.js";
import { updateDotenvFile } from "~/containers/admin/update-dotenv-file.js";
import type { StatefulWorkload } from "~/workloads/stateful/stateful-workload.js";
import { ApiError } from "./errors.js";
import type { ClientRuntime } from "./runtime.js";
import type { LocalApi, StartWorkloadInput } from "./types.js";

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

	return {
		start,
		startPromise: (input) => Effect.runPromise(start(input)),
	};
};
