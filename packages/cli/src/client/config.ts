import { AuthError, ConfigError } from "./errors.js";

const isBlank = (value: string | undefined): value is undefined =>
	!value || value.trim().length === 0;

export const normalizeBaseUrl = (baseUrl: string): string => {
	if (isBlank(baseUrl)) {
		throw new ConfigError({ message: "baseUrl is required" });
	}

	try {
		const parsed = new URL(baseUrl);
		return parsed.origin;
	} catch {
		throw new ConfigError({ message: "baseUrl must be a valid URL origin" });
	}
};

export const resolveAuthToken = (explicitAuthToken?: string): string => {
	if (!isBlank(explicitAuthToken)) {
		return explicitAuthToken.trim();
	}

	// oxlint-disable-next-line turbo/no-undeclared-env-vars
	const envToken = process.env.MONOLAYER_AUTH_TOKEN;
	if (!isBlank(envToken)) {
		return envToken.trim();
	}

	throw new AuthError({
		message:
			"Missing auth token. Pass authToken explicitly or set MONOLAYER_AUTH_TOKEN",
	});
};
