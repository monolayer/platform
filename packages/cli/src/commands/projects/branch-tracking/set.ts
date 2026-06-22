import { Flags } from "@oclif/core";

import { BaseCommand } from "../../../base-command.js";

export default class BranchTrackingSet extends BaseCommand {
	static summary = "Set a branch tracking rule";
	static description = "Creates or updates a branch tracking rule for the project.";

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://control-plane-domain --auth-token deploy_token_... --project-id proj-1 --branch production --enabled",
		"<%= config.bin %> <%= command.id %> --base-url https://control-plane-domain --auth-token deploy_token_... --project-id proj-1 --branch production --no-enabled",
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
		branch: Flags.string({
			required: true,
			summary: "Branch name or scope (e.g. production, preview, or a custom branch)",
		}),
		enabled: Flags.boolean({
			required: true,
			allowNo: true,
			summary: "Enable or disable tracking for the specified branch",
		}),
	};

	public async run(): Promise<{ readonly success: true }> {
		const { flags } = await this.parse(BranchTrackingSet);
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
		const result = await client.branchTracking.upsertPromise({
			projectId: flags["project-id"],
			branch: flags.branch,
			enabled: flags.enabled,
		});

		this.log(JSON.stringify(result, null, 2));

		return result;
	}
}
