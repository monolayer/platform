import { afterEach, describe, expect, it } from "vitest";

import { AuthError, ConfigError } from "../../src/sdk/errors.js";
import {
	normalizeBaseUrl,
	resolveAuthToken,
} from "../../src/sdk/config.js";

describe("sdk config", () => {
	const originalToken = process.env.MONOLAYER_AUTH_TOKEN;

	afterEach(() => {
		if (originalToken) {
			process.env.MONOLAYER_AUTH_TOKEN = originalToken;
			return;
		}
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
		process.env.MONOLAYER_AUTH_TOKEN = "env-token";
		expect(resolveAuthToken("explicit-token")).toBe("explicit-token");
	});

	it("uses env token when explicit token is missing", () => {
		process.env.MONOLAYER_AUTH_TOKEN = "env-token";
		expect(resolveAuthToken(undefined)).toBe("env-token");
	});

	it("fails when no auth token source is available", () => {
		delete process.env.MONOLAYER_AUTH_TOKEN;
		expect(() => resolveAuthToken(undefined)).toThrow(AuthError);
	});
});
