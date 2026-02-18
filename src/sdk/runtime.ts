import { Effect } from "effect";

import { ApiError } from "./errors.js";
import type {
	CreateClientOptions,
	DeploymentsApi,
	ProjectsApi,
	SecretsApi,
} from "./types.js";

export type ClientRuntime = {
	readonly baseUrl: string;
	readonly authToken: string;
	readonly transport: NonNullable<CreateClientOptions["transport"]>;
};

const notImplemented = <T>(operation: string) =>
	Effect.fail(
		new ApiError({
			message: `${operation} is not implemented yet`,
		}),
	) as Effect.Effect<T, ApiError>;

export const createUnimplementedProjectsApi = (): ProjectsApi => ({
	list: () => notImplemented("projects.list"),
	listPromise: () => Effect.runPromise(notImplemented("projects.list")),
});

export const createUnimplementedDeploymentsApi = (): DeploymentsApi => ({
	create: () => notImplemented("deployments.create"),
	createPromise: () => Effect.runPromise(notImplemented("deployments.create")),
	get: () => notImplemented("deployments.get"),
	getPromise: () => Effect.runPromise(notImplemented("deployments.get")),
	list: () => notImplemented("deployments.list"),
	listPromise: () => Effect.runPromise(notImplemented("deployments.list")),
});

export const createUnimplementedSecretsApi = (): SecretsApi => ({
	set: () => notImplemented("secrets.set"),
	setPromise: () => Effect.runPromise(notImplemented("secrets.set")),
	list: () => notImplemented("secrets.list"),
	listPromise: () => Effect.runPromise(notImplemented("secrets.list")),
});
