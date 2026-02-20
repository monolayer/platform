import { beforeEach, describe, expect, it, vi } from "vitest";
import { printStatus } from "~/cli/print-status.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";
import StatusTest from "../../../../src/commands/local/status/test.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/containers/admin/introspection.js");
vi.mock("~/cli/print-status.js");
vi.mock("~/sdk/client.js", () => ({
	createClient: vi.fn(),
}));

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
			// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		const mockStatusPromise = vi.fn().mockResolvedValue(mockStatus);
		// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(createClient).mockReturnValue({
			local: {
				statusPromise: mockStatusPromise,
			},
		} as any);

		await StatusTest.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(createClient).toHaveBeenCalledWith({
			baseUrl: "http://localhost",
			authToken: "local",
		});
		expect(mockStatusPromise).toHaveBeenCalledWith({
			workload: mockWorkload,
			mode: "test",
		});
		expect(printStatus).toHaveBeenCalledWith([mockStatus]);
	});

	it("logs message when no workloads found", async () => {
		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: [],
			// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		await StatusTest.run([]);

		expect(printStatus).not.toHaveBeenCalled();
	});
});
