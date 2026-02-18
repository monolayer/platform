import { normalizeBaseUrl, resolveAuthToken } from "./config.js";
import { createMockTransport } from "./mock-transport.js";
import {
	createUnimplementedDeploymentsApi,
	createUnimplementedProjectsApi,
	createUnimplementedSecretsApi,
} from "./runtime.js";
import type { CreateClientOptions, MonolayerClient } from "./types.js";

export const createClient = (options: CreateClientOptions): MonolayerClient => {
	const baseUrl = normalizeBaseUrl(options.baseUrl);
	const authToken = resolveAuthToken(options.authToken);
	const transport = options.transport ?? createMockTransport();

	void authToken;
	void transport;

	return {
		config: { baseUrl },
		projects: createUnimplementedProjectsApi(),
		deployments: createUnimplementedDeploymentsApi(),
		secrets: createUnimplementedSecretsApi(),
	};
};
