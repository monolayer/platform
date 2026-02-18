import { execSync } from "child_process";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	removeFromDotenvfile,
	updateDotenvFile,
} from "~/containers/admin/update-dotenv-file.js";
import { importWorkloads } from "~/scan/workload-imports.js";
import { Redis } from "~/workloads/stateful/redis.js";
import StartTest from "../../src/commands/local/start/test.js";
import StatusTest from "../../src/commands/local/status/test.js";
import StopTest from "../../src/commands/local/stop/test.js";

// Mock imports to control the workload being tested
vi.mock("~/scan/workload-imports.js");
// Mock dotenv file updates to avoid side effects on the file system
vi.mock("~/containers/admin/update-dotenv-file.js");
// Silence spinners
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

describe("workload lifecycle (integration)", () => {
	const testRedis = new Redis("integration-test-redis");

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(importWorkloads).mockResolvedValue({
			workloadsWithContainers: [testRedis],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);
	});

	afterEach(async () => {
		// Ensure cleanup even if test fails
		try {
			await StopTest.run([]);
		} catch {
			// Ignore errors during cleanup
		}
	});

	it("starts, checks status, and stops a real redis container", async () => {
		// 1. Start the workload
		await StartTest.run([]);

		// 2. Verify updateDotenvFile was called with a valid connection string
		expect(updateDotenvFile).toHaveBeenCalledTimes(1);
		const updateCall = vi.mocked(updateDotenvFile).mock.calls[0];
		if (!updateCall) throw new Error("updateDotenvFile not called");
		const envUpdates = updateCall[0];
		if (!envUpdates) throw new Error("envUpdates is undefined");
		expect(envUpdates).toHaveLength(1);
		expect(envUpdates[0]!.name).toBe("ML_REDIS_INTEGRATION_TEST_REDIS_URL");
		expect(envUpdates[0]!.value).toMatch(/^redis:\/\/.*:\d+$/);

		// 3. Verify container is actually running using docker ps
		const dockerPs = execSync(
			`docker ps --filter "label=org.monolayer-workloads.workload-id=redis-integration-test-redis" --format "{{.ID}}"`,
		)
			.toString()
			.trim();
		expect(dockerPs).toBeTruthy();

		// 4. Check Status
		const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
		await StatusTest.run([]);

		expect(consoleSpy).toHaveBeenCalled();
		const statusOutput = consoleSpy.mock.calls.join("\n");
		expect(statusOutput).toContain("integration-test-redis");
		expect(statusOutput).toContain("Redis");
		expect(statusOutput).toContain("running");
		consoleSpy.mockRestore();

		// 5. Stop the workload
		await StopTest.run([]);

		// 6. Verify removeFromDotenvfile was called
		expect(removeFromDotenvfile).toHaveBeenCalledWith(
			["ML_REDIS_INTEGRATION_TEST_REDIS_URL"],
			"test",
		);

		// 7. Verify container is gone
		const dockerPsAfter = execSync(
			`docker ps --filter "label=org.monolayer-workloads.workload-id=redis-integration-test-redis" --format "{{.ID}}"`,
		)
			.toString()
			.trim();
		expect(dockerPsAfter).toBeFalsy();
	}, 60000); // Increase timeout for docker operations
});
