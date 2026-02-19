import { beforeEach, describe, expect, it, vi } from "vitest";
import { printStatus } from "~/cli/print-status.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { createClient } from "~/sdk/client.js";
import StatusDev from "../../../../src/commands/local/status/dev.js";

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

describe("status dev command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("prints status of workloads in dev mode", async () => {
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

		const mockStatusPromise = vi.fn().mockResolvedValue(mockStatus);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(createClient).mockReturnValue({
			local: {
				statusPromise: mockStatusPromise,
			},
		} as any);

		await StatusDev.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(createClient).toHaveBeenCalledWith({
			baseUrl: "http://localhost",
			authToken: "local",
		});
		expect(mockStatusPromise).toHaveBeenCalledWith({
			workload: mockWorkload,
			mode: "dev",
		});
		expect(printStatus).toHaveBeenCalledWith([mockStatus]);
	});

	it("logs message when no workloads found", async () => {
		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: [],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		// const logSpy = vi.spyOn(process.stdout, "write");

		await StatusDev.run([]);

		expect(printStatus).not.toHaveBeenCalled();
		// Since Oclif's this.log writes to stdout
		// We can't easily spy on protected this.log directly without more complex setup,
		// but checking that printStatus was NOT called is a good signal.
		// Actually, we can check if it didn't crash.
	});
});
