import { expect } from "vitest";
import { Database } from "~/workloads/stateful/database.js";
import { StatefulWorkloadWithClient } from "~/workloads/stateful/stateful-workload.js";
import { test } from "./../../../test/__setup__/container-test.js";

test("Database is a StatefulWorkloadWithClient", () => {
	expect(Database.prototype).toBeInstanceOf(StatefulWorkloadWithClient);
});

class TestDatabase extends Database {
	connStringPrefix() {
		return "test";
	}
}

test("databaseId defaults to databaseName", () => {
	const db = new TestDatabase("myDb");
	expect(db.id).toStrictEqual(db.databaseName);
});

test("connection string components", () => {
	const db = new TestDatabase("myDb");
	expect(db.connStringComponents).toStrictEqual(["test", "myDb", "database"]);
});
