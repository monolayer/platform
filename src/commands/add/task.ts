import { Command, Flags } from "@oclif/core";
import { camelCase, kebabCase } from "case-anything";
import { exit } from "process";
import prompts from "prompts";
import { addTaskWorkload } from "~/scaffolding/task-workload.js";

export default class AddTask extends Command {
	static summary = "Add a Task workload";
	static description = "Add a Task workload to the project";

	static flags = {
		"skip-components": Flags.boolean({
			summary: "Skip component installation",
		}),
		name: Flags.string({ summary: "Name of the task" }),
	};

	public async run(): Promise<void> {
		const { flags } = await this.parse(AddTask);

		const taskOptions = flags.name
			? { id: kebabCase(flags.name), name: camelCase(flags.name) }
			: await this.promptTaskName();

		if (flags["skip-components"]) {
			addTaskWorkload(taskOptions);
			return;
		}
		addTaskWorkload(taskOptions);
	}

	private async promptTaskName() {
		let aborted = false;
		const select = await prompts({
			type: "text",
			name: "taskName",
			message: `Task name`,
			initial: "app",
			onState: (e) => {
				aborted = e.aborted;
			},
		});
		if (aborted) {
			exit(1);
		}
		return {
			name: camelCase(select.taskName),
			id: kebabCase(select.taskName),
		};
	}
}
