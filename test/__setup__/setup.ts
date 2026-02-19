import path from "node:path";
import { cwd } from "node:process";
import { vi } from "vitest";
import { workloadsConfiguration } from "~/configuration.js";

// Set NODE_ENV to production to silence Oclif dev plugin warnings
process.env.NODE_ENV = "production";

vi.mock("~/configuration.js", async (importOriginal) => {
	const actual =
		(await importOriginal()) as typeof import("~/configuration.js");
	return {
		...actual,
		workloadsConfiguration: vi.fn(async () => {
			await importTestConfig();
		}),
	};
});

vi.mocked(workloadsConfiguration).mockResolvedValue(await importTestConfig());

async function importTestConfig() {
	const imported = await import(
		path.join(...[cwd(), "test/fixtures/workloads.config.js"])
	);
	return imported.default && imported.default.default
		? imported.default.default
		: imported.default;
}
