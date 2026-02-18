import { Command } from "@oclif/core";
import { startWorkloads } from "~/cli/start-workloads.js";
import { importWorkloads } from "~/scan/workload-imports.js";

export default class StartTest extends Command {
	static summary = "Launch test workloads";
	static description = "Start workloads in test mode";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		startWorkloads(imports.workloadsWithContainers, {
			mode: "test",
			waitForHealthcheck: true,
		});
	}
}
