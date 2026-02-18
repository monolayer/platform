import { beforeEach, describe, expect, it, vi } from "vitest";
import { startContainer } from "~/containers/admin/container.js";
import { updateDotenvFile } from "~/containers/admin/update-dotenv-file.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { PostgresDatabase } from "~/workloads.js";
import StartDev from "../../../src/commands/start/dev.js";

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

// Mock workloads to avoid loading complex dependencies
vi.mock("~/workloads.js", () => ({
	PostgresDatabase: class {
		constructor(public id: string) {}
		get connectionStringEnvVar() {
			return `${this.id.toUpperCase()}_DATABASE_URL`;
		}
	},
	Bucket: class {
		constructor(public id: string) {}
	},
}));

describe("start dev command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("starts workloads in dev mode", async () => {
		const mockWorkloads = [new PostgresDatabase("test_db")];

		// Simulate startContainer setting the environment variable
		vi.mocked(startContainer).mockImplementation(async (workload) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const name = (workload as any).connectionStringEnvVar;
			process.env[name] = "postgres://localhost:5432/test_db";
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			return { containerId: "test-container" } as any;
		});

		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: mockWorkloads,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		await StartDev.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(startContainer).toHaveBeenCalledTimes(1);
		expect(startContainer).toHaveBeenCalledWith(mockWorkloads[0], {
			mode: "dev",
			waitForHealthcheck: true,
		});
		expect(updateDotenvFile).toHaveBeenCalledWith(
			[
				{
					name: "TEST_DB_DATABASE_URL",
					value: "postgres://localhost:5432/test_db",
				},
			],
			"dev",
		);
	});
});
