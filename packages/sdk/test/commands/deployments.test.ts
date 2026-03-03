import { afterEach, describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";

import DeploymentsCreate from "../../src/commands/deployments/create.js";
import DeploymentsGet from "../../src/commands/deployments/get.js";
import DeploymentsList from "../../src/commands/deployments/list.js";

const jsonResponse = (status: number, body: unknown): Response =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json",
		},
	});

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
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("creates deployments", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(201, {
				deploymentId: "dep-4",
				projectId: "proj-1",
				environmentId: "prod",
				status: "queued",
				createdAt: "2026-02-19T00:00:00.000Z",
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			DeploymentsCreate.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--project-id",
				"proj-1",
				"--branch-name",
				"main",
			]),
		);

		expect(result.deploymentId).toMatch(/^dep-/);
		expect(stdout).toContain(result.deploymentId);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe("https://api.monolayer.com/sdk/deployments");
		expect(requestInit.method).toBe("POST");
		expect(requestInit.body).toBe(
			JSON.stringify({
				projectId: "proj-1",
				sourceRef: "main",
			}),
		);
	});

	it("gets deployments by id", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				deploymentId: "dep-1",
				projectId: "proj-1",
				environmentId: "prod",
				sourceRef: "main",
				status: "succeeded",
				createdAt: "2026-02-10T10:00:00.000Z",
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			DeploymentsGet.run([
				"dep-1",
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
				"--project-id",
				"proj-1",
			]),
		);

		expect(result.deploymentId).toBe("dep-1");
		expect(stdout).toContain("dep-1");
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe(
			"https://api.monolayer.com/sdk/projects/proj-1/deployments/dep-1",
		);
		expect(requestInit.method).toBe("GET");
	});

	it("requires project-id when getting a deployment", async () => {
		await expect(
			DeploymentsGet.run([
				"dep-1",
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"test-token",
			]),
		).rejects.toThrow(/project-id/);
	});

	it("lists deployments in json mode", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				items: [
					{
						deploymentId: "dep-2",
						projectId: "proj-1",
						environmentId: "staging",
						sourceRef: "feature/a",
						status: "running",
						createdAt: "2026-02-12T18:30:00.000Z",
					},
				],
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

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
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});
});
