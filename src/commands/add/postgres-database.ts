import { Command, Flags } from "@oclif/core";
import { camelCase, kebabCase, snakeCase } from "case-anything";
import { exit } from "process";
import prompts from "prompts";
import { addDrizzlePostgres } from "~/scaffolding/drizzle.js";
import { addPostgresWorkload } from "~/scaffolding/postgres-database-workload.js";
import { addPrismaPosgres } from "~/scaffolding/prisma.js";

export default class AddPostgresDatabase extends Command {
	static summary = "Add a postgres-database workload";
	static description =
		"Add a PostgreSQL database workload with optional ORM setup";

	static flags = {
		name: Flags.string({ summary: "Name of the database" }),
		orm: Flags.string({ summary: "ORM to use (prisma, drizzle, none)" }),
		"skip-components": Flags.boolean({
			summary: "Skip installation of ORM components",
		}),
	};

	public async run(): Promise<void> {
		const { flags } = await this.parse(AddPostgresDatabase);

		const databaseOptions = flags.name
			? { id: kebabCase(flags.name), name: camelCase(flags.name) }
			: await this.promptDatabaseName();

		if (flags["skip-components"]) {
			addPostgresWorkload(databaseOptions);
			return;
		}

		let orm = flags.orm;
		if (!orm) {
			orm = await this.promptORM();
		}

		switch (orm) {
			case "prisma":
				await addPrismaPosgres(databaseOptions);
				break;
			case "drizzle":
				await addDrizzlePostgres(databaseOptions);
				break;
			case "none":
				// Do nothing
				break;
			default:
				this.error(
					"Invalid ORM option. Must be 'prisma' or 'drizzle' or 'none'.",
					{
						exit: 1,
					},
				);
		}
	}

	private async promptORM() {
		const ormChoices = [
			{
				title: "Prisma ORM",
				value: "prisma" as const,
			},
			{
				title: "Drizzle",
				value: "drizzle" as const,
			},
			{
				title: "Skip (already have a client configured)",
				value: "none" as const,
			},
		];
		let aborted = false;
		const select = await prompts({
			type: "select",
			name: "orm",
			message: `Select ORM`,
			choices: ormChoices,
			onState: (e) => {
				aborted = e.aborted;
			},
		});
		if (aborted) {
			exit(1);
		}
		return select.orm;
	}

	private async promptDatabaseName() {
		let aborted = false;
		const select = await prompts({
			type: "text",
			name: "databaseName",
			message: `Database name`,
			initial: "app",
			onState: (e) => {
				aborted = e.aborted;
			},
		});
		if (aborted) {
			exit(1);
		}
		return {
			name: snakeCase(select.databaseName),
			id: kebabCase(select.databaseName),
		};
	}
}
