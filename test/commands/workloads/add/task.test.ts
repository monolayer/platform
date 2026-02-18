import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddTask from "../../../src/commands/add/task.js";

vi.mock("prompts");
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

describe("add task command (integration)", () => {
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

	it("adds a task with name flag", async () => {
		await AddTask.run(["--name", "my-task"]);

		const workloadPath = path.join(tmpDir, "workloads", "my-task.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);
		const content = fs.readFileSync(workloadPath, "utf-8");

		const expectedContent = `import { Task } from "@monolayer/sdk";

export type MyTaskData = {
  message: string;
}

const myTask = new Task<MyTaskData>("my-task", async ({ data }) => {
	console.log("message", data.message);
});

export default myTask;
`;
		expect(content).toBe(expectedContent);
	});
});
