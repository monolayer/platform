import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { EnvironmentVariableDto } from "../../client/types.js";

export default class EnvSet extends BaseCommand {
	static summary = "Set an environment variable";
	static description = "Creates or updates an environment variable for the project.";

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://control-plane-domain --auth-token deploy_token_... --project-id proj-1 --key API_KEY --value secret-value --environment production",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"base-url": Flags.string({
			env: "MONOLAYER_BASE_URL",
			summary:
				"Control plane API base origin (falls back to MONOLAYER_BASE_URL when omitted)",
		}),
		"project-id": Flags.string({
			required: true,
			summary: "Project identifier",
		}),
		key: Flags.string({
			required: true,
			summary: "Environment variable key",
		}),
		value: Flags.string({
			required: true,
			summary: "Environment variable value",
		}),
		environment: Flags.string({
			required: true,
			summary: "Target environment name (e.g. production, preview, all)",
		}),
	};

	public async run(): Promise<EnvironmentVariableDto> {
		const { flags } = await this.parse(EnvSet);
		const baseUrl = flags["base-url"]?.trim();
		if (!baseUrl) {
			this.error(
				"Missing base URL. Pass --base-url explicitly or set MONOLAYER_BASE_URL.",
				{ exit: 1 },
			);
		}
		const authToken = flags["auth-token"]?.trim();
		if (!authToken) {
			this.error(
				"Missing auth token. Pass --auth-token explicitly or set MONOLAYER_AUTH_TOKEN.",
				{ exit: 1 },
			);
		}

		if (!authToken.startsWith("deploy_token_")) {
			this.error('auth-token must start with "deploy_token_"', { exit: 1 });
		}

		const client = this.createClient({
			...flags,
			"base-url": baseUrl,
			"auth-token": authToken,
		});
		const result = await client.environmentVariables.createPromise({
			projectId: flags["project-id"],
			key: flags.key,
			value: flags.value,
			environment: flags.environment,
		});

		this.log(JSON.stringify(result, null, 2));

		return result;
	}
}
