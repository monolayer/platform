import { Args } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { DeploymentDto } from "../../sdk/types.js";

export default class DeploymentsGet extends BaseCommand {
	static summary = "Get deployment details";
	static description = "Get a deployment by deploymentId.";
	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %> dep-1 --base-url https://api.monolayer.com",
		"<%= config.bin %> <%= command.id %> dep-1 --base-url https://api.monolayer.com --json",
	];

	static flags = {
		...BaseCommand.baseFlags,
	};

	static args = {
		deploymentId: Args.string({
			required: true,
			description: "Deployment identifier",
		}),
	};

	public async run(): Promise<DeploymentDto> {
		const { args, flags } = await this.parse(DeploymentsGet);
		const client = this.createSdkClient(flags);
		const result = await client.deployments.getPromise({
			deploymentId: args.deploymentId,
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
