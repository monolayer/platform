import { Command } from "@oclif/core";
import { printStatus } from "~/cli/print-status.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";

export default class StatusTest extends Command {
	static summary = "List test workloads status";
	static description =
		"List the status of the test workloads' Docker containers";

	public async run(): Promise<void> {
		await this.parse(StatusTest);
		const imports = await importWorkloads();
		const client = createClient({
			baseUrl: "http://localhost",
			authToken: "local",
		});

		const statuses = await Promise.all(
			imports.workloadsWithContainers.map((workload) =>
				client.local.statusPromise({
					workload,
					mode: "test",
				}),
			),
		);
		if (statuses.length === 0) {
			this.log("No workloads to show status.");
		} else {
			printStatus(statuses);
		}
	}
}
