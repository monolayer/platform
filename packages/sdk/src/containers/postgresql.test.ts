import { assert } from "vitest";
import { PostgreSQLContainer } from "~/containers/postgresql.js";
import { PostgresDatabase } from "~/workloads/stateful/postgres-database.js";
import { assertExposedPorts } from "~test/__setup__/assertions.js";
import { test } from "~test/__setup__/container-test.js";

test(
	"PostgreSQL started container",
	{ sequential: true },
	async ({ containers }) => {
		if (process.env.CI) {
			return;
		}
		const postgreSQL = new PostgresDatabase("test_started_container");

		const container = new PostgreSQLContainer(postgreSQL);
		const startedContainer = await container.start(true);
		containers.push(startedContainer);
		const labels = startedContainer.getLabels();
		assert.strictEqual(
			labels["org.monolayer-workloads.workload-id"],
			"postgresdatabase-test-started-container",
		);
		await assertExposedPorts({
			container: startedContainer,
			ports: [5432],
		});

		assert.strictEqual(
			process.env.ML_PG_TEST_STARTED_CONTAINER_DATABASE_URL,
			`postgresql://postgres:postgres@localhost:${startedContainer.getMappedPort(5432)}/test_started_container`,
		);
		assert.strictEqual(
			container.connectionURI,
			`postgresql://postgres:postgres@localhost:${startedContainer.getMappedPort(5432)}/test_started_container`,
		);
	},
);
