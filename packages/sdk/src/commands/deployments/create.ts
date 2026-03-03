import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { DeploymentDto } from "../../sdk/types.js";

export default class DeploymentsCreate extends BaseCommand {
	static summary = "Create a deployment";
	static description = "Create a deployment for a project.";
	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1",
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1 --branch-name main --json",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"project-id": Flags.string({
			required: true,
			summary: "Project identifier",
		}),
		"branch-name": Flags.string({
			summary: "Git branch name to deploy",
		}),
	};

	public async run(): Promise<DeploymentDto> {
		const { flags } = await this.parse(DeploymentsCreate);
		const client = this.createSdkClient(flags);
		const result = await client.deployments.createPromise({
			projectId: flags["project-id"],
			sourceRef: flags["branch-name"],
		});

		if (flags.json) {
			return result;
		}

		this.log(
			`${result.deploymentId}\t${result.projectId}\t${result.status}\t${result.createdAt}`,
		);

		return result;
	}
}
