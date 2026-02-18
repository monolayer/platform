import { Command } from "@oclif/core";
import { execSync } from "child_process";

const registryJSON = "https://registry.monolayer.dev/r/broadcast.json";

export default class AddBroadcast extends Command {
	static summary = "Add a Broadcast workload";
	static description = "Add a Broadcast workload to the project";

	public async run(): Promise<void> {
		await this.parse(AddBroadcast);
		execSync(`npx shadcn@latest add ${registryJSON}`, { stdio: "inherit" });
	}
}
