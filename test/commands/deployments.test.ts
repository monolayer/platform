import { describe, expect, it, vi } from "vitest";

// eslint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";

import DeploymentsCreate from "../../src/commands/deployments/create.js";
import DeploymentsGet from "../../src/commands/deployments/get.js";
import DeploymentsList from "../../src/commands/deployments/list.js";

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

describe("deployments commands", () => {
	it("creates deployments", async () => {
		const { result, stdout } = await captureStdout(() =>
			DeploymentsCreate.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--project-id",
				"proj-1",
				"--environment-id",
				"prod",
			]),
		);

		expect(result.deploymentId).toMatch(/^dep-/);
		expect(stdout).toContain(result.deploymentId);
	});

	it("gets deployments by id", async () => {
		const { result, stdout } = await captureStdout(() =>
			DeploymentsGet.run([
				"dep-1",
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
			]),
		);

		expect(result.deploymentId).toBe("dep-1");
		expect(stdout).toContain("dep-1");
	});

	it("lists deployments in json mode", async () => {
		const { result, stdout } = await captureStdout(() =>
			DeploymentsList.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--project-id",
				"proj-1",
				"--json",
			]),
		);

		expect(result.items.every((item) => item.projectId === "proj-1")).toBe(
			true,
		);
		expect(stdout).toContain('"items"');
	});
});
