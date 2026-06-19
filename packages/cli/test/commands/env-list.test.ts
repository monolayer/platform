import { afterEach, describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalBaseUrl = process.env.MONOLAYER_BASE_URL;
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalAuthToken = process.env.MONOLAYER_AUTH_TOKEN;

import EnvList from "../../src/commands/env/list.js";

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

describe("env:list command", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		if (originalBaseUrl === undefined) {
			// oxlint-disable-next-line turbo/no-undeclared-env-vars
			delete process.env.MONOLAYER_BASE_URL;
		} else {
			// oxlint-disable-next-line turbo/no-undeclared-env-vars
			process.env.MONOLAYER_BASE_URL = originalBaseUrl;
		}

		if (originalAuthToken === undefined) {
			// oxlint-disable-next-line turbo/no-undeclared-env-vars
			delete process.env.MONOLAYER_AUTH_TOKEN;
			return;
		}

		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		process.env.MONOLAYER_AUTH_TOKEN = originalAuthToken;
	});

	it("prints JSON response on successful list", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				items: [
					{
						name: "API_KEY",
						value: "secret-value",
						environment: "production",
						updatedAt: "2026-06-19T11:23:17.000Z",
					},
				],
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			EnvList.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
			]),
		);

		expect(result.items).toHaveLength(1);
		expect(result.items[0]?.name).toBe("API_KEY");
		const output = JSON.parse(stdout) as typeof result;
		expect(output.items).toHaveLength(1);
		expect(output.items[0]?.environment).toBe("production");
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe(
			"https://api.monolayer.com/sdk/projects/proj-1/environment-variables",
		);
		expect(requestInit.method).toBe("GET");
	});

	it("fails fast with prefix validation error when token does not start with deploy_token_", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				EnvList.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"api_token_invalid",
					"--project-id",
					"proj-1",
				]),
			),
		).rejects.toThrow(/auth-token must start with "deploy_token_"/);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("fails with helpful message when base-url is missing", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		delete process.env.MONOLAYER_BASE_URL;

		await expect(
			captureStdout(() =>
				EnvList.run([
					"--auth-token",
					"deploy_token_test",
					"--project-id",
					"proj-1",
				]),
			),
		).rejects.toThrow(
			/Missing base URL\. Pass --base-url explicitly or set MONOLAYER_BASE_URL\./,
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("fails with helpful message when auth-token is missing", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		delete process.env.MONOLAYER_AUTH_TOKEN;

		await expect(
			captureStdout(() =>
				EnvList.run([
					"--base-url",
					"https://api.monolayer.com",
					"--project-id",
					"proj-1",
				]),
			),
		).rejects.toThrow(
			/Missing auth token\. Pass --auth-token explicitly or set MONOLAYER_AUTH_TOKEN\./,
		);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("fails with helpful message when project-id is missing", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				EnvList.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"deploy_token_test",
				]),
			),
		).rejects.toThrow(/Missing required flag project-id/);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
