import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { ListResult, ProjectDto } from "../../sdk/types.js";

export default class ProjectsList extends BaseCommand {
	static summary = "List projects";
	static description = "List projects with cursor-based pagination.";

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://control-plane-domain",
		"<%= config.bin %> <%= command.id %> --base-url https://control-plane-domain --limit 1",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"base-url": Flags.string({
			env: "MONOLAYER_BASE_URL",
			summary:
				"Control plane API base origin (falls back to MONOLAYER_BASE_URL when omitted)",
		}),
		cursor: Flags.string({
			summary: "Pagination cursor from previous response",
		}),
		limit: Flags.integer({
			summary: "Maximum number of items to return",
			default: 50,
		}),
	};

	public async run(): Promise<ListResult<ProjectDto>> {
		const { flags } = await this.parse(ProjectsList);
		const baseUrl = flags["base-url"]?.trim();
		if (!baseUrl) {
			this.error(
				"Missing base URL. Pass --base-url explicitly or set MONOLAYER_BASE_URL.",
				{ exit: 1 },
			);
		}
		const client = this.createSdkClient({
			...flags,
			"base-url": baseUrl,
		});
		const result = await client.projects.listPromise({
			cursor: flags.cursor,
			limit: flags.limit,
		});

		this.log(JSON.stringify(result, null, 2));

		return result;
	}
}
