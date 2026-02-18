import { beforeEach, describe, expect, it, vi } from "vitest";
import { Make } from "~/make/make.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import Build from "../../../src/commands/workloads/build.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("~/make/make.js", () => {
	const MockMake = vi.fn();
	MockMake.prototype.build = vi
		.fn()
		.mockResolvedValue("/path/to/manifest.json");
	return {
		Make: MockMake,
	};
});
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

describe("workloads build command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("builds workloads and generates manifest", async () => {
		const mockImports = { workloadsWithContainers: [] };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(importWorkloads).mockResolvedValue(mockImports as any);

		await Build.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(Make).toHaveBeenCalledWith(mockImports);
		// Get the instance created by the mock
		const makeInstance = vi.mocked(Make).mock.instances[0];
		expect(makeInstance.build).toHaveBeenCalled();
	});
});
