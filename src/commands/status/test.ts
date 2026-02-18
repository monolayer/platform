import { Command } from "@oclif/core";
import { printStatus } from "~/cli/print-status.js";
import { workloadContainerStatus } from "~/containers/admin/introspection.js";
import { importWorkloads } from "~/scan/workload-imports.js";

export default class StatusTest extends Command {
	static summary = "List test workloads status";
	static description =
		"List the status of the test workloads' Docker containers";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		const statuses = await Promise.all(
			imports.workloadsWithContainers.map(async (workload) =>
				workloadContainerStatus(workload, "test"),
			),
		);
		if (statuses.length === 0) {
			this.log("No workloads to show status.");
		} else {
			printStatus(statuses);
		}
	}
}
