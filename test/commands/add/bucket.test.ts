import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddBucket from "../../../src/commands/add/bucket.js";

vi.mock("prompts");
vi.mock("node:child_process");
vi.mock("ora", () => ({
	default: () => ({
		start: vi.fn(),
		succeed: vi.fn(),
		fail: vi.fn(),
		text: "",
	}),
}));

describe("add bucket command (integration)", () => {
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

	it("adds a bucket file when skip-components is used", async () => {
		await AddBucket.run(["--name", "my-bucket", "--skip-components"]);

		const workloadPath = path.join(tmpDir, "workloads", "my-bucket.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);
		const content = fs.readFileSync(workloadPath, "utf-8");

		const expectedContent = `import { Bucket } from "@monolayer/sdk";

const myBucket = new Bucket("my-bucket");

export default myBucket;
`;
		expect(content).toBe(expectedContent);
		expect(execSync).not.toHaveBeenCalled();
	});

	it("adds a bucket and runs shadcn add when skip-components is false", async () => {
		await AddBucket.run(["--name", "my-bucket"]);

		const workloadPath = path.join(tmpDir, "workloads", "my-bucket.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);

		expect(execSync).toHaveBeenCalledWith(
			expect.stringContaining("npx shadcn@latest add"),
			expect.anything(),
		);
	});
});
