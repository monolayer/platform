import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import prompts from "prompts";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddCron from "../../../../src/commands/workloads/add/cron.js";

vi.mock("prompts");
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

describe("add cron command (integration)", () => {
	let tmpDir: string;
	let originalCwd: string;

	beforeEach(() => {
		originalCwd = process.cwd();
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "monolayer-test-"));
		process.chdir(tmpDir);
		vi.clearAllMocks();
	});

	afterEach(() => {
		process.chdir(originalCwd);
		fs.rmSync(tmpDir, { recursive: true, force: true });
	});

	it("adds a cron workload with prompt", async () => {
		vi.mocked(prompts).mockResolvedValueOnce({ cronName: "my-cron" });

		await AddCron.run([]);

		const workloadPath = path.join(tmpDir, "workloads", "my-cron.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);
		const content = fs.readFileSync(workloadPath, "utf-8");

		const expectedContent = `import { Cron } from "@monolayer/sdk";

const myCron = new Cron("my-cron", {
	schedule: "* * * * *",
	run: async () => {
		console.log("Hello, world!");
	},
});

export default myCron;
`;
		expect(content).toBe(expectedContent);
	});
});
