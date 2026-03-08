import { Command, Flags } from "@oclif/core";

import { createClient } from "./client/client.js";

export abstract class BaseCommand extends Command {
	static baseFlags = {
		"base-url": Flags.string({
			required: true,
			env: "MONOLAYER_BASE_URL",
			summary: "Control plane API base origin",
		}),
		"auth-token": Flags.string({
			env: "MONOLAYER_AUTH_TOKEN",
			summary: "Auth token (falls back to MONOLAYER_AUTH_TOKEN when omitted)",
		}),
	};

	protected createClient(flags: {
		readonly "base-url": string;
		readonly "auth-token"?: string;
	}) {
		return createClient({
			baseUrl: flags["base-url"],
			authToken: flags["auth-token"],
		});
	}

	protected renderList<TItem>(
		items: ReadonlyArray<TItem>,
		renderItem: (item: TItem) => string,
		nextCursor?: string,
	): void {
		if (items.length === 0) {
			this.log("No items found.");
			return;
		}

		for (const item of items) {
			this.log(renderItem(item));
		}

		if (nextCursor) {
			this.log(`nextCursor=${nextCursor}`);
		}
	}
}
