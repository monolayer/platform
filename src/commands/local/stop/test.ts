import { Command } from "@oclif/core";
import ora from "ora";
import { spinnerMessage } from "~/cli/spinner-message.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";

export default class StopTest extends Command {
	static summary = "Stop test workloads";
	static description = "Stop test workloads";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		const client = createClient({ baseUrl: "http://localhost" });

		for (const workload of imports.workloadsWithContainers) {
			const spinner = ora();
			spinner.start(spinnerMessage(workload, "Stop"));
			try {
				await client.local.stopPromise({
					workload,
					mode: "test",
				});
				spinner.succeed();
			} catch (e) {
				spinner.fail();
				throw e;
			}
		}
	}
}
