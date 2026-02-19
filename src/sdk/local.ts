import { Effect } from "effect";
import { startContainer, stopContainer } from "~/containers/admin/container.js";
import { workloadContainerStatus } from "~/containers/admin/introspection.js";
import { updateDotenvFile } from "~/containers/admin/update-dotenv-file.js";
import type { StatefulWorkload } from "~/workloads/stateful/stateful-workload.js";
import type { Cron } from "~/workloads/stateless/cron.js";
import { ApiError } from "./errors.js";
import type { ClientRuntime } from "./runtime.js";
import type {
	LocalApi,
	StartWorkloadInput,
	StatusWorkloadInput,
	StopWorkloadInput,
	TriggerWorkloadInput,
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

	const status = (input: StatusWorkloadInput) =>
		Effect.tryPromise({
			try: async () => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				return await workloadContainerStatus(input.workload as any, input.mode);
			},
			catch: (error) => new ApiError({ message: String(error) }),
		});

	const trigger = (input: TriggerWorkloadInput) =>
		Effect.tryPromise({
			try: async () => {
				const cron = input.workload as Cron;
				await cron.run();
			},
			catch: (error) => new ApiError({ message: String(error) }),
		});

	return {
		start,
		startPromise: (input) => Effect.runPromise(start(input)),
		stop,
		stopPromise: (input) => Effect.runPromise(stop(input)),
		status,
		statusPromise: (input) => Effect.runPromise(status(input)),
		trigger,
		triggerPromise: (input) => Effect.runPromise(trigger(input)),
	};
};
