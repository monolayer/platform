import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import prompts from "prompts";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddPostgresDatabase from "../../../src/commands/add/postgres-database.js";

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

// Mock workloads.js to avoid loading client-side React code
vi.mock("~/workloads.js", () => ({
	PostgresDatabase: class {
		constructor(public id: string) {}
		get connectionStringEnvVar() {
			return `${this.id.toUpperCase()}_DATABASE_URL`;
		}
	},
}));

describe("add postgres-database command (integration)", () => {
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

	it("adds a postgres workload file when skip-components is used", async () => {
		await AddPostgresDatabase.run([
			"--name",
			"my-db",
			"--orm",
			"none",
			"--skip-components",
		]);

		const workloadPath = path.join(tmpDir, "workloads", "my-db.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);
		const content = fs.readFileSync(workloadPath, "utf-8");
		const expectedContent = `import { PostgresDatabase } from "@monolayer/sdk";

const myDb = new PostgresDatabase("my-db");

export default myDb;
`;
		expect(content).toBe(expectedContent);
	});

	it("adds drizzle components and modifies files", async () => {
		// Setup existing files expected by drizzle scaffolding
		fs.mkdirSync(path.join(tmpDir, "lib", "drizzle"), { recursive: true });
		fs.writeFileSync(path.join(tmpDir, "drizzle.config.ts"), "");
		fs.writeFileSync(path.join(tmpDir, "lib", "drizzle", "drizzle.ts"), "");
		// Mock package.json for script addition
		fs.writeFileSync(path.join(tmpDir, "package.json"), "{}");

		await AddPostgresDatabase.run(["--name", "my-db", "--orm", "drizzle"]);

		// Check workload creation
		const workloadPath = path.join(tmpDir, "workloads", "my-db.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);

		// Check imports added to drizzle.config.ts
		const configContent = fs.readFileSync(
			path.join(tmpDir, "drizzle.config.ts"),
			"utf-8",
		);
		expect(configContent).toContain(
			'import database from "./workloads/my-db";',
		);

		// Check imports added to client file
		const clientContent = fs.readFileSync(
			path.join(tmpDir, "lib", "drizzle", "drizzle.ts"),
			"utf-8",
		);
		expect(clientContent).toContain(
			'import database from "@/workloads/my-db";',
		);

		// Check execSync was called for shadcn
		expect(execSync).toHaveBeenCalledWith(
			expect.stringContaining("npx shadcn@latest add"),
			expect.anything(),
		);
	});

	it("adds prisma components and modifies files", async () => {
		// Setup existing files expected by prisma scaffolding
		fs.mkdirSync(path.join(tmpDir, "lib", "prisma"), { recursive: true });
		fs.writeFileSync(path.join(tmpDir, "prisma.config.ts"), "");
		fs.writeFileSync(path.join(tmpDir, "lib", "prisma", "prisma.ts"), "");
		fs.writeFileSync(path.join(tmpDir, "package.json"), "{}");

		await AddPostgresDatabase.run(["--name", "my-db", "--orm", "prisma"]);

		// Check workload creation
		const workloadPath = path.join(tmpDir, "workloads", "my-db.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);

		// Check imports added
		const configContent = fs.readFileSync(
			path.join(tmpDir, "prisma.config.ts"),
			"utf-8",
		);
		expect(configContent).toContain(
			'import database from "./workloads/my-db";',
		);
	});

	it("prompts for name and creates workload", async () => {
		vi.mocked(prompts).mockResolvedValueOnce({ databaseName: "prompt-db" });
		vi.mocked(prompts).mockResolvedValueOnce({ orm: "none" });

		await AddPostgresDatabase.run(["--skip-components"]);

		const workloadPath = path.join(tmpDir, "workloads", "prompt-db.ts");
		expect(fs.existsSync(workloadPath)).toBe(true);
		const content = fs.readFileSync(workloadPath, "utf-8");
		const expectedContent = `import { PostgresDatabase } from "@monolayer/sdk";

const prompt_db = new PostgresDatabase("prompt-db");

export default prompt_db;
`;
		expect(content).toBe(expectedContent);
	});
});
