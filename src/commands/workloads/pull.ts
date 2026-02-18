import { Command } from "@oclif/core";
import ora from "ora";
import { getContainerRuntimeClient, ImageName } from "testcontainers";
import { BroadcastContainer } from "~/containers/broadcast.js";
import { MinioContainer } from "~/containers/minio.js";
import { PostgreSQLContainer } from "~/containers/postgresql.js";
import { RedisContainer } from "~/containers/redis.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import {
	type StatefulWorkload,
	type StatefulWorkloadWithClient,
} from "~/workloads.js";
import {
	assertBroadcast,
	assertBucket,
	assertPostgresDatabase,
	assertRedis,
} from "~/workloads/assertions.js";
import type { AnyBroadcast } from "~/workloads/stateless/broadcast/router.js";

export default class Pull extends Command {
	static summary = "Pull all workloads' Docker images";
	static description = "Pull Docker images for all defined workloads";

	public async run(): Promise<void> {
		const imports = await importWorkloads();
		const images = (
			await Promise.all(
				imports.workloadsWithContainers.flatMap(
					async (workload) => await this.containerForWorkload(workload),
				),
			)
		)
			.filter((name): name is string => name !== undefined)
			.reduce<Set<string>>((acc, name) => acc.add(name), new Set<string>());

		await this.pullImages(Array.from(images));
	}

	private async containerForWorkload(
		workload: StatefulWorkloadWithClient | StatefulWorkload | AnyBroadcast,
	) {
		// console.log("constructor", workload.constructor.name);
		switch (workload.constructor.name) {
			case "PostgresDatabase":
				assertPostgresDatabase(workload);
				return await new PostgreSQLContainer(workload).containerImage();
			case "Redis":
				assertRedis(workload);
				return await new RedisContainer(workload).containerImage();
			case "Bucket":
				assertBucket(workload);
				return await new MinioContainer(workload).containerImage();
			case "Broadcast":
				assertBroadcast(workload);
				return await new BroadcastContainer(workload).containerImage();
		}
	}

	private async pullImages(images: string[]) {
		const spinner = ora();
		for (const image of images) {
			spinner.start(`Pull ${image}`);
			const containerRuntimeClient = await getContainerRuntimeClient();
			await containerRuntimeClient.image.pull(ImageName.fromString(image));
			spinner.succeed();
		}
	}
}
