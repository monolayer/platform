import { Command } from "@oclif/core";
import { camelCase, kebabCase } from "case-anything";
import { readFileSync } from "fs";
import { exit } from "process";
import prompts from "prompts";
import { addAfterRolloutWorkload } from "~/scaffolding/lifecycle.js";

export default class AddAfterRollout extends Command {
	static summary = "Add an after rollout workload";
	static description = "Add an after rollout workload to the project";

	public async run(): Promise<void> {
		await this.parse(AddAfterRollout);
		const script = await this.promtScriptName();
		addAfterRolloutWorkload(script);
	}

	private async promtScriptName() {
		let aborted = false;
		const select = await prompts({
			type: "select",
			name: "scriptName",
			message: `Select script to run after rollout`,
			choices: this.packageJSONScripts().map((script) => ({
				title: script,
				value: script,
			})),
			onState: (e) => {
				aborted = e.aborted;
			},
		});
		if (aborted) {
			exit(1);
		}
		return {
			name: camelCase(select.scriptName),
			id: kebabCase(select.scriptName),
			scriptName: select.scriptName,
		};
	}

	private packageJSONScripts() {
		const packageJSON = JSON.parse(readFileSync("package.json").toString());
		return Object.keys(packageJSON.scripts as Record<string, string>);
	}
}
