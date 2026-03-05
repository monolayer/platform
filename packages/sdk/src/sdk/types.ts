import { Effect } from "effect";

import type { SdkError } from "./errors.js";
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

export type SecretDto = {
  readonly projectId: string;
  readonly key: string;
  readonly updatedAt: string;
  readonly version: number;
};

export type ListProjectsInput = {
  readonly cursor?: string;
  readonly limit?: number;
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
  ) => Effect.Effect<ListResult<ProjectDto>, SdkError>;
  listPromise: (input?: ListProjectsInput) => Promise<ListResult<ProjectDto>>;
};

export type DeploymentsApi = {
  create: (
    input: CreateDeploymentInput,
  ) => Effect.Effect<DeploymentDto, SdkError>;
  createPromise: (input: CreateDeploymentInput) => Promise<DeploymentDto>;
  get: (input: GetDeploymentInput) => Effect.Effect<DeploymentDto, SdkError>;
  getPromise: (input: GetDeploymentInput) => Promise<DeploymentDto>;
  list: (
    input?: ListDeploymentsInput,
  ) => Effect.Effect<ListResult<DeploymentDto>, SdkError>;
  listPromise: (
    input?: ListDeploymentsInput,
  ) => Promise<ListResult<DeploymentDto>>;
};

export type MonolayerClient = {
  readonly config: {
    readonly baseUrl: string;
  };
  readonly projects: ProjectsApi;
  readonly deployments: DeploymentsApi;
};

export type CreateClientOptions = {
  readonly baseUrl: string;
  readonly authToken?: string;
  readonly transport?: Transport;
};
