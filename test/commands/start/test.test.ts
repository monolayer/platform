import { beforeEach, describe, expect, it, vi } from "vitest";
import { startContainer } from "~/containers/admin/container.js";
import { updateDotenvFile } from "~/containers/admin/update-dotenv-file.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { PostgresDatabase } from "~/workloads.js";
import StartTest from "../../../src/commands/start/test.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/containers/admin/container.js");
vi.mock("~/containers/admin/update-dotenv-file.js");
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

vi.mock("~/workloads.js", () => ({
	PostgresDatabase: class {
		constructor(public id: string) {}
		get connectionStringEnvVar() {
			return `${this.id.toUpperCase()}_DATABASE_URL`;
		}
	},
}));

describe("start test command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("starts workloads in test mode", async () => {
		const mockWorkloads = [new PostgresDatabase("test_db")];

		// Simulate startContainer setting the environment variable
		vi.mocked(startContainer).mockImplementation(async (workload) => {
			const name = workload.connectionStringEnvVar;
			process.env[name] = "postgres://localhost:5432/test_db";
			return { containerId: "test-container" } as any;
		});

		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: mockWorkloads,
		} as any);

		await StartTest.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(startContainer).toHaveBeenCalledTimes(1);
		expect(startContainer).toHaveBeenCalledWith(mockWorkloads[0], {
			mode: "test",
			waitForHealthcheck: true,
		});
		expect(updateDotenvFile).toHaveBeenCalledWith(
			[
				{
					name: "TEST_DB_DATABASE_URL",
					value: "postgres://localhost:5432/test_db",
				},
			],
			"test",
		);
	});
});
