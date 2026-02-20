import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { SecretDto } from "../../sdk/types.js";

export default class SecretsSet extends BaseCommand {
	static summary = "Set a secret";
	static description =
		"Create or update a project secret. The response never includes secret values.";
	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1 --key DATABASE_URL --value postgres://...",
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1 --key DATABASE_URL --value *** --json",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"project-id": Flags.string({
			required: true,
			summary: "Project identifier",
		}),
		key: Flags.string({
			required: true,
			summary: "Secret key",
		}),
		value: Flags.string({
			required: true,
			summary: "Secret value",
		}),
	};

	public async run(): Promise<SecretDto> {
		const { flags } = await this.parse(SecretsSet);
		const client = this.createSdkClient(flags);
		const result = await client.secrets.setPromise({
			projectId: flags["project-id"],
			key: flags.key,
			value: flags.value,
		});

		if (flags.json) {
			return result;
		}

		this.log(`${result.projectId}\t${result.key}\tv${result.version}`);
		return result;
	}
}
