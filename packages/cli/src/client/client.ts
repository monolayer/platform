import { normalizeBaseUrl, resolveAuthToken } from "./config.js";
import { createDeploymentsApi } from "./deployments.js";
import { createHttpTransport } from "./http-transport.js";
import { createProjectsApi } from "./projects.js";
import type { ClientRuntime } from "./runtime.js";
import type { CreateClientOptions, MonolayerClient } from "./types.js";

export const createClient = (options: CreateClientOptions): MonolayerClient => {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const authToken = resolveAuthToken(options.authToken);
  const transport = options.transport ?? createHttpTransport(baseUrl);

  const runtime: ClientRuntime = {
    baseUrl,
    authToken,
    transport,
  };

  return {
    config: { baseUrl },
    projects: createProjectsApi(runtime),
    deployments: createDeploymentsApi(runtime),
  };
};
