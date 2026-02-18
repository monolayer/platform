import { Command } from "@oclif/core";
import ora from "ora";
import { spinnerMessage } from "~/cli/spinner-message.js";
import { stopContainer } from "~/containers/admin/container.js";
import { importWorkloads } from "~/scan/workload-imports.js";

export default class StopDev extends Command {
	static summary = "Stop dev workloads";
	static description = "Stop dev workloads";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		for (const workload of imports.workloadsWithContainers) {
			const spinner = ora();
			spinner.start(spinnerMessage(workload, "Stop"));
			await stopContainer(workload, "dev");
			spinner.succeed();
		}
	}
}
