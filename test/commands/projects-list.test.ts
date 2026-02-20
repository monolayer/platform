import { describe, expect, it, vi } from "vitest";

// eslint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";

import ProjectsList from "../../src/commands/projects/list.js";

const captureStdout = async <T>(task: () => Promise<T>) => {
	const chunks: Array<string> = [];
	const writeSpy = vi.spyOn(process.stdout, "write").mockImplementation(((
		chunk: string | Uint8Array,
	) => {
		chunks.push(
			typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"),
		);
		return true;
	}) as typeof process.stdout.write);

	try {
		const result = await task();
		return { result, stdout: chunks.join("") };
	} finally {
		writeSpy.mockRestore();
	}
};

describe("projects:list command", () => {
	it("prints project rows in human mode", async () => {
		const { result, stdout } = await captureStdout(() =>
			ProjectsList.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--limit",
				"2",
			]),
		);

		expect(result.items).toHaveLength(2);
		expect(stdout).toContain("proj-1");
		expect(stdout).toContain("Control Plane");
	});

	it("prints JSON in --json mode", async () => {
		const { result, stdout } = await captureStdout(() =>
			ProjectsList.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--json",
			]),
		);

		expect(result.items.length).toBeGreaterThan(0);
		expect(stdout).toContain('"items"');
	});
});
