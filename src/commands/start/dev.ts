import { Command } from "@oclif/core";
import { startWorkloads } from "~/cli/start-workloads.js";
import { importWorkloads } from "~/scan/workload-imports.js";

export default class StartDev extends Command {
	static summary = "Launch dev workloads";
	static description = "Start workloads in development mode";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		startWorkloads(imports.workloadsWithContainers, {
			mode: "dev",
			waitForHealthcheck: true,
		});
	}
}
