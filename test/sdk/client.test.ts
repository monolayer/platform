import { afterEach, describe, expect, it } from "vitest";

import { AuthError } from "../../src/sdk/errors.js";
import { createClient } from "../../src/sdk/client.js";

describe("createClient", () => {
	const originalToken = process.env.MONOLAYER_AUTH_TOKEN;

	afterEach(() => {
		if (originalToken) {
			process.env.MONOLAYER_AUTH_TOKEN = originalToken;
			return;
		}
		delete process.env.MONOLAYER_AUTH_TOKEN;
	});

	it("builds a client with normalized config", () => {
		const client = createClient({
			baseUrl: "https://api.monolayer.com/v1",
			authToken: "test-token",
		});

		expect(client.config.baseUrl).toBe("https://api.monolayer.com");
	});

	it("fails fast when auth token is not provided", () => {
		delete process.env.MONOLAYER_AUTH_TOKEN;
		expect(() =>
			createClient({
				baseUrl: "https://api.monolayer.com",
			}),
		).toThrow(AuthError);
	});

	it("exposes placeholder SDK modules before transport implementation", async () => {
		const client = createClient({
			baseUrl: "https://api.monolayer.com",
			authToken: "test-token",
		});

		await expect(client.projects.listPromise()).rejects.toThrow(
			"projects.list is not implemented yet",
		);
		await expect(client.deployments.listPromise()).rejects.toThrow(
			"deployments.list is not implemented yet",
		);
		await expect(
			client.secrets.listPromise({ projectId: "proj-1" }),
		).rejects.toThrow("secrets.list is not implemented yet");
	});
});
