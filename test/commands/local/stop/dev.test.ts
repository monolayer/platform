import { beforeEach, describe, expect, it, vi } from "vitest";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";
import StopDev from "../../../../src/commands/local/stop/dev.js";

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

describe("stop dev command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("stops workloads in dev mode", async () => {
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

		await StopDev.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(createClient).toHaveBeenCalledWith({ baseUrl: "http://localhost" });
		expect(mockStopPromise).toHaveBeenCalledWith({
			workload: mockWorkload,
			mode: "dev",
		});
	});
});
