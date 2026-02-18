import { Command } from "@oclif/core";
import { camelCase, kebabCase } from "case-anything";
import { exit } from "process";
import prompts from "prompts";
import { addCronWorkload } from "~/scaffolding/cron-workload.js";

export default class AddCron extends Command {
	static summary = "Add a cron workload";
	static description = "Add a cron workload to the project";

	public async run(): Promise<void> {
		await this.parse(AddCron);
		const cron = await this.promptCronName();
		addCronWorkload(cron);
	}

	private async promptCronName() {
		let aborted = false;
		const select = await prompts({
			type: "text",
			name: "cronName",
			message: `Cron name`,
			initial: "app",
			onState: (e) => {
				aborted = e.aborted;
			},
		});
		if (aborted) {
			exit(1);
		}
		return {
			name: camelCase(select.cronName),
			id: kebabCase(select.cronName),
		};
	}
}
