import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { EnvironmentVariableDto, ListResult } from "../../client/types.js";

export default class EnvList extends BaseCommand {
	static summary = "List environment variables";
	static description = "List project environment variables as JSON output.";

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://control-plane-domain --auth-token deploy_token_... --project-id proj-1",
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
	};

	public async run(): Promise<ListResult<EnvironmentVariableDto>> {
		const { flags } = await this.parse(EnvList);
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
		const result = await client.environmentVariables.listPromise({
			projectId: flags["project-id"],
		});

		this.log(JSON.stringify(result, null, 2));

		return result;
	}
}
