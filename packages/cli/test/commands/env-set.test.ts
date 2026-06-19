import { afterEach, describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalBaseUrl = process.env.MONOLAYER_BASE_URL;
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalAuthToken = process.env.MONOLAYER_AUTH_TOKEN;

import EnvSet from "../../src/commands/env/set.js";

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

describe("env:set command", () => {
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

	it("prints JSON response on successful creation", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(201, {
				name: "NEW_KEY",
				value: "new-value",
				environment: "production",
				updatedAt: "2026-06-19T11:23:17.000Z",
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			EnvSet.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
				"--key",
				"NEW_KEY",
				"--value",
				"new-value",
				"--environment",
				"production",
			]),
		);

		expect(result.name).toBe("NEW_KEY");
		expect(result.value).toBe("new-value");
		const output = JSON.parse(stdout) as typeof result;
		expect(output.name).toBe("NEW_KEY");
		expect(output.environment).toBe("production");
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe(
			"https://api.monolayer.com/sdk/projects/proj-1/environment-variables",
		);
		expect(requestInit.method).toBe("POST");
		expect(JSON.parse(requestInit.body as string)).toEqual({
			key: "NEW_KEY",
			value: "new-value",
			environment: "production",
		});
	});

	it("fails fast with prefix validation error when token does not start with deploy_token_", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		await expect(
			captureStdout(() =>
				EnvSet.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"api_token_invalid",
					"--project-id",
					"proj-1",
					"--key",
					"NEW_KEY",
					"--value",
					"new-value",
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
				EnvSet.run([
					"--base-url",
					"https://api.monolayer.com",
					"--auth-token",
					"deploy_token_test",
					"--project-id",
					"proj-1",
					"--key",
					"NEW_KEY",
					"--value",
					"new-value",
				]),
			),
		).rejects.toThrow(/Missing required flag environment/);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
