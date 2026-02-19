import { beforeEach, describe, expect, it, vi } from "vitest";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";
import StopTest from "../../../../src/commands/local/stop/test.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/containers/admin/container.js");
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
	},
}));

describe("stop test command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("stops workloads in test mode", async () => {
		const mockWorkload = {
			constructor: { name: "PostgresDatabase" },
			id: "test-db",
		};

		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: [mockWorkload],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		const mockStopPromise = vi.fn().mockResolvedValue(undefined);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(createClient).mockReturnValue({
			local: {
				stopPromise: mockStopPromise,
			},
		} as any);

		await StopTest.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(createClient).toHaveBeenCalledWith({
			baseUrl: "http://localhost",
			authToken: "local",
		});
		expect(mockStopPromise).toHaveBeenCalledWith({
			workload: mockWorkload,
			mode: "test",
		});
	});
});
