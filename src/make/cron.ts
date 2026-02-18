import { kebabCase } from "case-anything";
import path from "path";
import { build } from "tsup";
import { tsupConfig } from "~/make/config.js";
import type { CronInfo } from "~/make/manifest.js";
import { requiredFiles } from "~/make/required-filtes.js";
import type { WorkloadImport } from "~/scan/workload-imports.js";
import type { Cron } from "~/workloads/stateless/cron.js";

export async function makeCron(cronImport: WorkloadImport<Cron>) {
	const dir = `crons/${kebabCase(cronImport.workload.id)}`;
	const cronFileName = await buildCron(cronImport, dir);

	return {
		path: dir,
		entryPoint: cronFileName,
		dockerfileName: "none",
	};
}

async function buildCron(cronImport: WorkloadImport<Cron>, dir: string) {
	const ext = ".cjs";
	await build(
		tsupConfig({ index: cronImport.src }, `.workloads/${dir}`, [/(.*)/], ext),
	);
	return `index.mjs`;
}

export async function cronRequiredFiles(taskInfo: CronInfo) {
	const cronPath = path.join(".workloads", taskInfo.path, taskInfo.entryPoint);
	await requiredFiles(cronPath);
}
