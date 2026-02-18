import { Command, Flags } from "@oclif/core";
import { camelCase, kebabCase } from "case-anything";
import { execSync } from "child_process";
import { exit } from "process";
import prompts from "prompts";
import { addBucketWorkload } from "~/scaffolding/bucket-workload.js";

const registryJSON = "https://registry.monolayer.dev/r/bucket.json";

export default class AddBucket extends Command {
	static summary = "Add a Bucket workload";
	static description = "Add a Bucket workload to the project";

	static flags = {
		"skip-components": Flags.boolean({
			summary: "Skip component installation",
		}),
		name: Flags.string({ summary: "Name of the bucket" }),
	};

	public async run(): Promise<void> {
		const { flags } = await this.parse(AddBucket);

		const bucketOptions = flags.name
			? { id: kebabCase(flags.name), name: camelCase(flags.name) }
			: await this.prompBucketName();

		if (flags["skip-components"]) {
			addBucketWorkload(bucketOptions);
			return;
		}
		execSync(`npx shadcn@latest add ${registryJSON}`, { stdio: "inherit" });
		addBucketWorkload(bucketOptions);
	}

	private async prompBucketName() {
		let aborted = false;
		const select = await prompts({
			type: "text",
			name: "bucketName",
			message: `Bucket name`,
			initial: "app",
			onState: (e) => {
				aborted = e.aborted;
			},
		});
		if (aborted) {
			exit(1);
		}
		return {
			name: camelCase(select.bucketName),
			id: kebabCase(select.bucketName),
		};
	}
}
