import { Command } from "@oclif/core";
import ora from "ora";
import { spinnerMessage } from "~/cli/spinner-message.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";

export default class StartDev extends Command {
	static summary = "Launch dev workloads";
	static description = "Start workloads in development mode";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		const client = createClient({ baseUrl: "http://localhost" }); // Base URL not used for local, but required

		for (const workload of imports.workloadsWithContainers) {
			const spinner = ora();
			spinner.start(spinnerMessage(workload, "Start"));
			try {
				await client.local.startPromise({
					workload,
					mode: "dev",
					waitForHealthcheck: true,
				});
				spinner.succeed();
			} catch (e) {
				spinner.fail();
				throw e;
			}
		}
	}
}
