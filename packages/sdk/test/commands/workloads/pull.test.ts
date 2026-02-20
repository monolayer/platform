import { getContainerRuntimeClient, ImageName } from "testcontainers";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { importWorkloads } from "~/scan/workload-imports.js";
import Pull from "../../../src/commands/workloads/pull.js";

vi.mock("~/scan/workload-imports.js");
vi.mock("testcontainers");
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

// Mock containers
vi.mock("~/containers/postgresql.js", () => ({
	PostgreSQLContainer: class {
		async containerImage() {
			return "postgres:latest";
		}
	},
}));
vi.mock("~/containers/redis.js", () => ({
	RedisContainer: class {
		async containerImage() {
			return "redis:latest";
		}
	},
}));
vi.mock("~/workloads/assertions.js", () => ({
	assertPostgresDatabase: vi.fn(),
	assertRedis: vi.fn(),
	assertBucket: vi.fn(),
	assertBroadcast: vi.fn(),
}));

describe("workloads pull command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("pulls images for defined workloads", async () => {
		const mockWorkloads = [
			{ constructor: { name: "PostgresDatabase" } },
			{ constructor: { name: "Redis" } },
		];

		// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: mockWorkloads,
		} as any);

		const mockPull = vi.fn();
		// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(getContainerRuntimeClient).mockResolvedValue({
			image: { pull: mockPull },
		} as any);

		await Pull.run([]);

		expect(importWorkloads).toHaveBeenCalled();
		expect(getContainerRuntimeClient).toHaveBeenCalledTimes(2); // Once for each image
		expect(mockPull).toHaveBeenCalledTimes(2);
		expect(ImageName.fromString).toHaveBeenCalledWith("postgres:latest");
		expect(ImageName.fromString).toHaveBeenCalledWith("redis:latest");
	});

	it("deduplicates images", async () => {
		const mockWorkloads = [
			{ constructor: { name: "PostgresDatabase" } },
			{ constructor: { name: "PostgresDatabase" } }, // Duplicate type, same image
		];

		// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: mockWorkloads,
		} as any);

		const mockPull = vi.fn();
		// oxlint-disable-next-line @typescript-eslint/no-explicit-any
		vi.mocked(getContainerRuntimeClient).mockResolvedValue({
			image: { pull: mockPull },
		} as any);

		await Pull.run([]);

		expect(mockPull).toHaveBeenCalledTimes(1); // Should only pull once
	});
});
