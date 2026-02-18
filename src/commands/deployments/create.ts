import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { DeploymentDto } from "../../sdk/types.js";

export default class DeploymentsCreate extends BaseCommand<DeploymentDto> {
	static summary = "Create a deployment";
	static description = "Create a deployment for a project.";
	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1",
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1 --environment-id prod --source-ref main --json",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"project-id": Flags.string({
			required: true,
			summary: "Project identifier",
		}),
		"environment-id": Flags.string({
			summary: "Environment identifier",
		}),
		"source-ref": Flags.string({
			summary: "Source reference (branch, commit, tag)",
		}),
	};

	public async run(): Promise<DeploymentDto> {
		const { flags } = await this.parse(DeploymentsCreate);
		const client = this.createSdkClient(flags);
		const result = await client.deployments.createPromise({
			projectId: flags["project-id"],
			environmentId: flags["environment-id"],
			sourceRef: flags["source-ref"],
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
