import { Effect } from "effect";

import type { ClientError } from "./errors.js";
import type { Transport } from "./transport.js";

export type ListResult<T> = {
  readonly items: ReadonlyArray<T>;
  readonly nextCursor?: string;
};

export type ProjectDto = {
  readonly projectId: string;
  readonly name: string;
  readonly repositoryUrl: string;
};

export type DeploymentStatus =
  | "queued"
  | "running"
  | "failed"
  | "succeeded"
  | "cancelled";

export type DeploymentDto = {
  readonly deploymentId: string;
  readonly projectId: string;
  readonly environmentId?: string;
  readonly sourceRef?: string;
  readonly status: DeploymentStatus;
  readonly createdAt: string;
};

export type ListProjectsInput = {
  readonly cursor?: string;
  readonly limit?: number;
};

export type EnvironmentVariableDto = {
  readonly name: string;
  readonly value: string;
  readonly environment: string;
  readonly updatedAt: string;
};

export type ListEnvironmentVariablesInput = {
  readonly projectId: string;
};

export type CreateEnvironmentVariableInput = {
  readonly projectId: string;
  readonly key: string;
  readonly value: string;
  readonly environment: string;
};

export type DeleteEnvironmentVariableInput = {
  readonly projectId: string;
  readonly name: string;
  readonly environmentName: string;
};

export type CreateDeploymentInput = {
  readonly projectId: string;
  readonly environmentId?: string;
  readonly sourceRef?: string;
};

export type GetDeploymentInput = {
  readonly projectId: string;
  readonly deploymentId: string;
};

export type ListDeploymentsInput = {
  readonly projectId?: string;
  readonly cursor?: string;
  readonly limit?: number;
};

export type ProjectsApi = {
  list: (
    input?: ListProjectsInput,
  ) => Effect.Effect<ListResult<ProjectDto>, ClientError>;
  listPromise: (input?: ListProjectsInput) => Promise<ListResult<ProjectDto>>;
};

export type DeploymentsApi = {
  create: (
    input: CreateDeploymentInput,
  ) => Effect.Effect<DeploymentDto, ClientError>;
  createPromise: (input: CreateDeploymentInput) => Promise<DeploymentDto>;
  get: (input: GetDeploymentInput) => Effect.Effect<DeploymentDto, ClientError>;
  getPromise: (input: GetDeploymentInput) => Promise<DeploymentDto>;
  list: (
    input?: ListDeploymentsInput,
  ) => Effect.Effect<ListResult<DeploymentDto>, ClientError>;
  listPromise: (
    input?: ListDeploymentsInput,
  ) => Promise<ListResult<DeploymentDto>>;
};

export type EnvironmentVariablesApi = {
  list: (
    input: ListEnvironmentVariablesInput,
  ) => Effect.Effect<ListResult<EnvironmentVariableDto>, ClientError>;
  listPromise: (
    input: ListEnvironmentVariablesInput,
  ) => Promise<ListResult<EnvironmentVariableDto>>;
  create: (
    input: CreateEnvironmentVariableInput,
  ) => Effect.Effect<EnvironmentVariableDto, ClientError>;
  createPromise: (
    input: CreateEnvironmentVariableInput,
  ) => Promise<EnvironmentVariableDto>;
  delete: (
    input: DeleteEnvironmentVariableInput,
  ) => Effect.Effect<{ readonly success: true }, ClientError>;
  deletePromise: (
    input: DeleteEnvironmentVariableInput,
  ) => Promise<{ readonly success: true }>;
};

export type MonolayerClient = {
  readonly config: {
    readonly baseUrl: string;
  };
  readonly projects: ProjectsApi;
  readonly deployments: DeploymentsApi;
  readonly environmentVariables: EnvironmentVariablesApi;
};

export type CreateClientOptions = {
  readonly baseUrl: string;
  readonly authToken?: string;
  readonly transport?: Transport;
};
