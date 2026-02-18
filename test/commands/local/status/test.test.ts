import { beforeEach, describe, expect, it, vi } from "vitest";
import { printStatus } from "~/cli/print-status.js";
import { workloadContainerStatus } from "~/containers/admin/introspection.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import StatusTest from "../../../../src/commands/local/status/test.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/containers/admin/introspection.js");
vi.mock("~/cli/print-status.js");

vi.mock("~/workloads.js", () => ({
	PostgresDatabase: class {
		constructor(public id: string) {}
	},
}));

describe("status test command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("prints status of workloads in test mode", async () => {
		const mockWorkload = {
			constructor: { name: "PostgresDatabase" },
			id: "test-db",
		};
		const mockStatus = {
			name: "test-db",
			status: "running",
			port: 5432,
		};

		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: [mockWorkload],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(workloadContainerStatus).mockResolvedValue(mockStatus as any);

		await StatusTest.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(workloadContainerStatus).toHaveBeenCalledWith(mockWorkload, "test");
		expect(printStatus).toHaveBeenCalledWith([mockStatus]);
	});

	it("logs message when no workloads found", async () => {
		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: [],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		await StatusTest.run([]);

		expect(printStatus).not.toHaveBeenCalled();
	});
});
