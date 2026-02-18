import { normalizeBaseUrl, resolveAuthToken } from "./config.js";
import { createDeploymentsApi } from "./deployments.js";
import { createMockTransport } from "./mock-transport.js";
import { createProjectsApi } from "./projects.js";
import { createSecretsApi } from "./secrets.js";
import type { CreateClientOptions, MonolayerClient } from "./types.js";
import type { ClientRuntime } from "./runtime.js";

export const createClient = (options: CreateClientOptions): MonolayerClient => {
	const baseUrl = normalizeBaseUrl(options.baseUrl);
	const authToken = resolveAuthToken(options.authToken);
	const transport = options.transport ?? createMockTransport();

	const runtime: ClientRuntime = {
		baseUrl,
		authToken,
		transport,
	};

	return {
		config: { baseUrl },
		projects: createProjectsApi(runtime),
		deployments: createDeploymentsApi(runtime),
		secrets: createSecretsApi(runtime),
	};
};
