import { afterEach, describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalBaseUrl = process.env.MONOLAYER_BASE_URL;
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalAuthToken = process.env.MONOLAYER_AUTH_TOKEN;

import EnvDelete from "../../src/commands/env/delete.js";

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

describe("env:delete command", () => {
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

	it("prints JSON response on successful delete", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				success: true,
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			EnvDelete.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
				"--name",
				"API_KEY",
				"--environment",
				"production",
			]),
		);

		expect(result.success).toBe(true);
		const output = JSON.parse(stdout) as typeof result;
		expect(output.success).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe(
			"https://api.monolayer.com/sdk/projects/proj-1/environment-variables/API_KEY?environmentName=production",
		);
		expect(requestInit.method).toBe("DELETE");
	});

	it("fails fast with prefix validation error when token does not start with deploy_token_", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				EnvDelete.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"api_token_invalid",
					"--project-id",
					"proj-1",
					"--name",
					"API_KEY",
					"--environment",
					"production",
				]),
			),
		).rejects.toThrow(/auth-token must start with "deploy_token_"/);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("fails with helpful message when required flag is missing", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				EnvDelete.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"deploy_token_test",
					"--project-id",
					"proj-1",
					"--name",
					"API_KEY",
				]),
			),
		).rejects.toThrow(/Missing required flag environment/);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
