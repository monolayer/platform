import { beforeEach, describe, expect, it, vi } from "vitest";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";
import { PostgresDatabase } from "~/workloads.js";
import StartTest from "../../../../src/commands/local/start/test.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/containers/admin/container.js");
vi.mock("~/containers/admin/update-dotenv-file.js");
vi.mock("~/sdk/client.js", () => ({
	createClient: vi.fn(),
}));
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

		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: mockWorkloads,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		const mockStartPromise = vi.fn().mockResolvedValue(undefined);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(createClient).mockReturnValue({
			local: {
				startPromise: mockStartPromise,
			},
		} as any);

		await StartTest.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(createClient).toHaveBeenCalledWith({
			baseUrl: "http://localhost",
			authToken: "local",
		});
		expect(mockStartPromise).toHaveBeenCalledWith({
			workload: mockWorkloads[0],
			mode: "test",
			waitForHealthcheck: true,
		});
	});
});
