import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { ListResult, SecretDto } from "../../sdk/types.js";

export default class SecretsList extends BaseCommand {
	static summary = "List secrets";
	static description =
		"List project secret metadata (keys, version, updatedAt). Values are never returned.";
	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1",
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1 --limit 1 --json",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"project-id": Flags.string({
			required: true,
			summary: "Project identifier",
		}),
		cursor: Flags.string({
			summary: "Pagination cursor from previous response",
		}),
		limit: Flags.integer({
			summary: "Maximum number of items to return",
			default: 50,
		}),
	};

	public async run(): Promise<ListResult<SecretDto>> {
		const { flags } = await this.parse(SecretsList);
		const client = this.createSdkClient(flags);
		const result = await client.secrets.listPromise({
			projectId: flags["project-id"],
			cursor: flags.cursor,
			limit: flags.limit,
		});

		if (flags.json) {
			return result;
		}

		this.renderList(
			result.items,
			(item) => `${item.projectId}\t${item.key}\tv${item.version}\t${item.updatedAt}`,
			result.nextCursor,
		);
		return result;
	}
}
