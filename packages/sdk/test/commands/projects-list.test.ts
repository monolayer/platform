import { afterEach, describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";

import ProjectsList from "../../src/commands/projects/list.js";

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

describe("projects:list command", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("prints JSON response by default", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				items: [
					{
						projectId: "proj-1",
						name: "Control Plane",
						repositoryUrl: "https://github.com/monolayer/control-plane",
					},
					{
						projectId: "proj-2",
						name: "Workflow Engine",
						repositoryUrl: "https://github.com/monolayer/workflow-engine",
					},
				],
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

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
		expect(result.items[0]?.repositoryUrl).toBe(
			"https://github.com/monolayer/control-plane",
		);
		const output = JSON.parse(stdout) as typeof result;
		expect(output.items).toHaveLength(2);
		expect(output.items[0]?.projectId).toBe("proj-1");
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe(
			"https://api.monolayer.com/sdk/projects?limit=2",
		);
		expect(requestInit.method).toBe("GET");
	});

	it("rejects --json because output is always JSON", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				items: [
					{
						projectId: "proj-1",
						name: "Control Plane",
						repositoryUrl: "https://github.com/monolayer/control-plane",
					},
				],
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				ProjectsList.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"test-token",
					"--json",
				]),
			),
		).rejects.toThrow(/--json/);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
