import { afterEach, describe, expect, it } from "vitest";

import { AuthError, ConfigError } from "../../src/client/errors.js";
import { normalizeBaseUrl, resolveAuthToken } from "../../src/client/config.js";

describe("client config", () => {
	// oxlint-disable-next-line turbo/no-undeclared-env-vars
	const originalToken = process.env.MONOLAYER_AUTH_TOKEN;

	afterEach(() => {
		if (originalToken) {
			// oxlint-disable-next-line turbo/no-undeclared-env-vars
			process.env.MONOLAYER_AUTH_TOKEN = originalToken;
			return;
		}
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		delete process.env.MONOLAYER_AUTH_TOKEN;
	});

	it("normalizes base url to origin", () => {
		expect(normalizeBaseUrl("https://api.monolayer.com/v1")).toBe(
			"https://api.monolayer.com",
		);
	});

	it("fails for invalid base url", () => {
		expect(() => normalizeBaseUrl("")).toThrow(ConfigError);
		expect(() => normalizeBaseUrl("not-a-url")).toThrow(ConfigError);
	});

	it("prefers explicit auth token over env token", () => {
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		process.env.MONOLAYER_AUTH_TOKEN = "env-token";
		expect(resolveAuthToken("explicit-token")).toBe("explicit-token");
	});

	it("uses env token when explicit token is missing", () => {
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		process.env.MONOLAYER_AUTH_TOKEN = "env-token";
		expect(resolveAuthToken(undefined)).toBe("env-token");
	});

	it("fails when no auth token source is available", () => {
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		delete process.env.MONOLAYER_AUTH_TOKEN;
		expect(() => resolveAuthToken(undefined)).toThrow(AuthError);
	});
});
