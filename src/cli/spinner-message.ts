import color from "picocolors";
import type { Workload } from "~/workloads.js";
import type { Database } from "~/workloads/stateful/database.js";

export function spinnerMessage(workload: Workload, prefix: "Start" | "Stop") {
	let message = "";
	if (
		workload.constructor.name === "PostgresDatabase" ||
		workload.constructor.name === "MySqlDatabase"
	) {
		const databaseWorkload = workload as Database;
		message = `${prefix} ${databaseWorkload.databaseName} (${workload.id}) ${color.gray(workload.constructor.name)}`;
	} else {
		message = `${prefix} ${workload.id} ${color.gray(workload.constructor.name)}`;
	}
	return message;
}
