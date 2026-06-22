import { afterEach, describe, expect, it, vi } from "vitest";

// oxlint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalBaseUrl = process.env.MONOLAYER_BASE_URL;
// oxlint-disable-next-line turbo/no-undeclared-env-vars
const originalAuthToken = process.env.MONOLAYER_AUTH_TOKEN;

import BranchTrackingGet from "../../src/commands/projects/branch-tracking/get.js";

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

describe("projects:branch-tracking:get command", () => {
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

	it("prints JSON response on successful get", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			jsonResponse(200, {
				production: true,
				preview: false,
				branches: [{ "feature-a": true }],
			}),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const { result, stdout } = await captureStdout(() =>
			BranchTrackingGet.run([
				"--base-url",
				"https://api.monolayer.com",
				"--auth-token",
				"deploy_token_test",
				"--project-id",
				"proj-1",
			]),
		);

		expect(result.production).toBe(true);
		expect(result.preview).toBe(false);
		expect(result.branches).toHaveLength(1);
		expect(result.branches[0]).toEqual({ "feature-a": true });
		const output = JSON.parse(stdout) as typeof result;
		expect(output.production).toBe(true);
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe(
			"https://api.monolayer.com/sdk/projects/proj-1/branch-tracking",
		);
		expect(requestInit.method).toBe("GET");
	});
});
