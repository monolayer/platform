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
		const client = this.createSdkClient(flags);
		const result = await client.projects.listPromise({
			cursor: flags.cursor,
			limit: flags.limit,
		});

		this.log(JSON.stringify(result, null, 2));

		return result;
	}
}
