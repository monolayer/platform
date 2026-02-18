import { beforeEach, describe, expect, it, vi } from "vitest";
import { stopContainer } from "~/containers/admin/container.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import StopDev from "../../../src/commands/stop/dev.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/containers/admin/container.js");
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

		await StopDev.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(stopContainer).toHaveBeenCalledTimes(1);
		expect(stopContainer).toHaveBeenCalledWith(mockWorkload, "dev");
	});
});
