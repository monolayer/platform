import { describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";

import SecretsList from "../../src/commands/secrets/list.js";
import SecretsSet from "../../src/commands/secrets/set.js";

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

describe("secrets commands", () => {
	it("sets a secret and prints metadata only", async () => {
		const { result, stdout } = await captureStdout(() =>
			SecretsSet.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--project-id",
				"proj-1",
				"--key",
				"DATABASE_URL",
				"--value",
				"postgres://value",
			]),
		);

		expect(result.key).toBe("DATABASE_URL");
		expect(result).not.toHaveProperty("value");
		expect(stdout).toContain("DATABASE_URL");
		expect(stdout).not.toContain("postgres://value");
	});

	it("lists secrets in json mode", async () => {
		const { result, stdout } = await captureStdout(() =>
			SecretsList.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--project-id",
				"proj-1",
				"--json",
			]),
		);

		expect(result.items.length).toBeGreaterThan(0);
		expect(stdout).toContain('"items"');
	});
});
