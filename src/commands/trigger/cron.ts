import { Command, Flags } from "@oclif/core";
import dotenv from "dotenv";
import { exit } from "node:process";
import prompts from "prompts";
import { importWorkloads } from "~/scan/workload-imports.js";
import type { Cron } from "~/workloads/stateless/cron.js";

export default class TriggerCron extends Command {
	static summary = "Trigger a cron workload";
	static description = "Trigger a cron workload";

	static flags = {
		"env-file": Flags.string({
			char: "e",
			summary: "environment file to load",
			default: ".env",
		}),
		"cron-id": Flags.string({
			char: "c",
			summary: "ID of Cron to trigger",
		}),
	};

	public async run(): Promise<void> {
		const { flags } = await this.parse(TriggerCron);
		dotenv.config({ path: flags["env-file"] });
		const imports = await importWorkloads();
		const cronId = flags["cron-id"];

		if (cronId !== undefined) {
			const cronToTrigger = imports.Cron.find(
				(cron) => cron.workload.id === cronId,
			);
			if (cronToTrigger === undefined) {
				this.error(`error: cron workload not found: ${cronId}`, { exit: 1 });
			}
			await cronToTrigger.workload.run();
		} else {
			const cronChoices = imports.Cron.map((cron) => ({
				value: cron.workload,
				title: cron.workload.id,
			}));
			if (cronChoices.length === 0) {
				this.error(`error: No cron workloads found.`, { exit: 1 });
			}
			let aborted = false;
			const select = await prompts({
				type: "select",
				name: "cron",
				message: `Select cron to trigger`,
				choices: cronChoices,
				onState: (e) => {
					aborted = e.aborted;
				},
			});
			if (aborted) {
				exit(1);
			}
			await (select.cron as Cron).run();
		}
	}
}
