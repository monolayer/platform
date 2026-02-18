import dotenv from "dotenv";
import prompts from "prompts";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { importWorkloads } from "~/scan/workload-imports.js";
import TriggerCron from "../../../../src/commands/local/trigger/cron.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("prompts");
vi.mock("dotenv");

vi.mock("~/workloads.js", () => ({
	Cron: class {
		constructor(public id: string) {}
		run = vi.fn().mockResolvedValue(undefined);
	},
}));

describe("trigger cron command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("triggers cron by id", async () => {
		const mockRun = vi.fn().mockResolvedValue(undefined);
		const mockCron = { id: "test-cron", run: mockRun };

		vi.mocked(importWorkloads).mockResolvedValue({
			Cron: [{ workload: mockCron }],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		await TriggerCron.run(["--cron-id", "test-cron"]);

		expect(dotenv.config).toHaveBeenCalled();
		expect(importWorkloads).toHaveBeenCalled();
		expect(mockRun).toHaveBeenCalled();
	});

	it("triggers cron from selection prompt", async () => {
		const mockRun = vi.fn().mockResolvedValue(undefined);
		const mockCron1 = { id: "cron-1", run: mockRun };
		const mockCron2 = { id: "cron-2", run: vi.fn() };

		vi.mocked(importWorkloads).mockResolvedValue({
			Cron: [{ workload: mockCron1 }, { workload: mockCron2 }],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		vi.mocked(prompts).mockResolvedValueOnce({ cron: mockCron1 });

		await TriggerCron.run([]);

		expect(prompts).toHaveBeenCalled();
		expect(mockRun).toHaveBeenCalled();
	});

	it("errors when cron id not found", async () => {
		vi.mocked(importWorkloads).mockResolvedValue({
			Cron: [],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		// Oclif's this.error exits the process, so we expect it to reject/throw
		await expect(
			TriggerCron.run(["--cron-id", "missing-cron"]),
		).rejects.toThrow();
	});

	it("errors when no crons available for prompt", async () => {
		vi.mocked(importWorkloads).mockResolvedValue({
			Cron: [],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);

		await expect(TriggerCron.run([])).rejects.toThrow();
	});
});
