import { Flags } from "@oclif/core";

import { BaseCommand } from "../../base-command.js";
import type { DeploymentDto, ListResult } from "../../sdk/types.js";

export default class DeploymentsList extends BaseCommand<
	ListResult<DeploymentDto>
> {
	static summary = "List deployments";
	static description =
		"List deployments with optional project filtering and cursor pagination.";
	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com",
		"<%= config.bin %> <%= command.id %> --base-url https://api.monolayer.com --project-id proj-1 --limit 1 --json",
	];

	static flags = {
		...BaseCommand.baseFlags,
		"project-id": Flags.string({
			summary: "Filter by projectId",
		}),
		cursor: Flags.string({
			summary: "Pagination cursor from previous response",
		}),
		limit: Flags.integer({
			summary: "Maximum number of items to return",
			default: 50,
		}),
	};

	public async run(): Promise<ListResult<DeploymentDto>> {
		const { flags } = await this.parse(DeploymentsList);
		const client = this.createSdkClient(flags);
		const result = await client.deployments.listPromise({
			projectId: flags["project-id"],
			cursor: flags.cursor,
			limit: flags.limit,
		});

		if (flags.json) {
			return result;
		}

		this.renderList(
			result.items,
			(item) =>
				`${item.deploymentId}\t${item.projectId}\t${item.status}\t${item.createdAt}`,
			result.nextCursor,
		);

		return result;
	}
}
