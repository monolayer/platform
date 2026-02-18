import { Command } from "@oclif/core";
import path from "node:path";
import { cwd } from "node:process";
import ora from "ora";
import { Make } from "~/make/make.js";
import { importWorkloads } from "~/scan/workload-imports.js";

export default class Build extends Command {
	static summary = "Build workloads";
	static description = "Build workloads and generate manifest";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		const spinner = ora();
		spinner.start("Build workloads");
		const workloadMake = new Make(imports);
		const manifestPath = await workloadMake.build();
		spinner.succeed(`${spinner.text}`);
		this.log("");
		this.log(`Manifest: ${path.relative(cwd(), manifestPath)}`);
	}
}
