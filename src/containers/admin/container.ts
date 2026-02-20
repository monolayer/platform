import { getExistingContainer } from "~/containers/admin/introspection.js";
import { removeFromDotenvfile } from "~/containers/admin/update-dotenv-file.js";
import { containerStarter } from "~/containers/container-starter.js";
import { type Workload } from "~/workloads/workload.js";
/**
 * Launches a dev container for a workload.
 */
export async function startContainer(
	/**
	 * Workload with the dev container to launch.
	 */
	workload: Workload,
	options: {
		mode: "dev" | "test";
		waitForHealthcheck: boolean;
	},
) {
	const startedTestContainer = await containerStarter.startForWorload(
		workload,
		options,
	);
	if (startedTestContainer === undefined) {
		throw new Error(`no container match for workload: ${workload.id}`);
	}
	return startedTestContainer;
}

/**
 * Stops the dev container for a workload.
 */
export async function stopContainer(
	/**
	 * Workload with the dev container to stop.
	 */
	workload: Workload,
	mode: "dev" | "test",
) {
	const startedTestContainer = await getExistingContainer(workload, mode);

	if (startedTestContainer === undefined) {
		return;
	} else {
		try {
			await startedTestContainer.stop();
			await removeFromDotenvfile(
				// oxlint-disable-next-line @typescript-eslint/no-explicit-any
				[(workload as any).connectionStringEnvVar],
				mode,
			);
			// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			if (e.reason !== "container already stopped") {
				throw e;
			}
		}
	}
}
