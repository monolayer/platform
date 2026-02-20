import { expect } from "vitest";
import { Database } from "~/workloads/stateful/database.js";
import { PostgresDatabase } from "~/workloads/stateful/postgres-database.js";
import { test } from "~test/__setup__/container-test.js";

test("PostgresDatabase is a Database", () => {
	expect(PostgresDatabase.prototype).toBeInstanceOf(Database);
});

test("connStringComponents", async () => {
	const postgres = new PostgresDatabase("products");
	expect(postgres.connStringComponents).toStrictEqual([
		"pg",
		"products",
		"database",
	]);
});
