import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import prompts from "prompts";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddAfterRollout from "../../../src/commands/add/after-rollout.js";
import AddBeforeRollout from "../../../src/commands/add/before-rollout.js";
import AddBootstrap from "../../../src/commands/add/bootstrap.js";

vi.mock("prompts");
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

describe("lifecycle commands (integration)", () => {
	let tmpDir: string;
	let originalCwd: string;

	beforeEach(() => {
		originalCwd = process.cwd();
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "monolayer-test-"));
		process.chdir(tmpDir);
		vi.clearAllMocks();

		// Create package.json for scripts prompt
		fs.writeFileSync(
			path.join(tmpDir, "package.json"),
			JSON.stringify({
				scripts: {
					build: "echo build",
					test: "echo test",
				},
			}),
		);
	});

	afterEach(() => {
		process.chdir(originalCwd);
		fs.rmSync(tmpDir, { recursive: true, force: true });
	});

	describe("add bootstrap", () => {
		it("adds bootstrap workload", async () => {
			vi.mocked(prompts).mockResolvedValueOnce({ scriptName: "build" });

			await AddBootstrap.run([]);

			const workloadPath = path.join(tmpDir, "workloads", "bootstrap-build.ts");
			expect(fs.existsSync(workloadPath)).toBe(true);
			const content = fs.readFileSync(workloadPath, "utf-8");

			const expected = `import { Bootstrap } from "@monolayer/sdk";

const build = new Bootstrap("build", {
	script: "build",
});

export default build;
`;
			expect(content).toBe(expected);
		});
	});

	describe("add before-rollout", () => {
		it("adds before-rollout workload", async () => {
			vi.mocked(prompts).mockResolvedValueOnce({ scriptName: "test" });

			await AddBeforeRollout.run([]);

			const workloadPath = path.join(
				tmpDir,
				"workloads",
				"before-rollout-test.ts",
			);
			expect(fs.existsSync(workloadPath)).toBe(true);
			const content = fs.readFileSync(workloadPath, "utf-8");

			const expected = `import { BeforeRollout } from "@monolayer/sdk";

const test = new BeforeRollout("test", {
	script: "test",
});

export default test;
`;
			expect(content).toBe(expected);
		});
	});

	describe("add after-rollout", () => {
		it("adds after-rollout workload", async () => {
			vi.mocked(prompts).mockResolvedValueOnce({ scriptName: "build" });

			await AddAfterRollout.run([]);

			const workloadPath = path.join(
				tmpDir,
				"workloads",
				"after-rollout-build.ts",
			);
			expect(fs.existsSync(workloadPath)).toBe(true);
			const content = fs.readFileSync(workloadPath, "utf-8");

			const expected = `import { AfterRollout } from "@monolayer/sdk";

const build = new AfterRollout("build", {
	script: "build",
});

export default build;
`;
			expect(content).toBe(expected);
		});
	});
});
