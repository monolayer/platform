import { beforeEach, describe, expect, it, vi } from "vitest";
import { stopContainer } from "~/containers/admin/container.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import StopTest from "../../../src/commands/stop/test.js";

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
		} as any);

		await StopTest.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(stopContainer).toHaveBeenCalledTimes(1);
		expect(stopContainer).toHaveBeenCalledWith(mockWorkload, "test");
	});
});
