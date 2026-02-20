import { beforeEach, describe, expect, it, vi } from "vitest";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";
import { PostgresDatabase } from "~/workloads.js";
import StartDev from "../../../../src/commands/local/start/dev.js";

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

		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: mockWorkloads,
			// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		const mockStartPromise = vi.fn().mockResolvedValue(undefined);
		// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(createClient).mockReturnValue({
			local: {
				startPromise: mockStartPromise,
			},
		} as any);

		await StartDev.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(createClient).toHaveBeenCalledWith({
			baseUrl: "http://localhost",
			authToken: "local",
		});
		expect(mockStartPromise).toHaveBeenCalledWith({
			workload: mockWorkloads[0],
			mode: "dev",
			waitForHealthcheck: true,
		});
	});
});
