import { Command } from "@oclif/core";
import { camelCase, kebabCase } from "case-anything";
import { readFileSync } from "fs";
import { exit } from "process";
import prompts from "prompts";
import { addBootstrapWorkload } from "~/scaffolding/lifecycle.js";

export default class AddBootstrap extends Command {
	static summary = "Add a bootstrap workload";
	static description = "Add a bootstrap workload to the project";

	public async run(): Promise<void> {
		await this.parse(AddBootstrap);
		const script = await this.promtScriptName();
		addBootstrapWorkload(script);
	}

	private async promtScriptName() {
		let aborted = false;
		const select = await prompts({
			type: "select",
			name: "scriptName",
			message: `Select script to run when bootstrapping an environment`,
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
