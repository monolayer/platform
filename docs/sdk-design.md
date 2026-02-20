# SDK Design (Pre-1.0)

This document defines the target design for `@monolayer/control-plane-sdk` based on product decisions made on February 18, 2026.

## Product intent

- Primary users:
  - Platform engineers
  - AI agents building automation
- Iteration mode:
  - pre-1.0, fast iteration, fewer compatibility guarantees

## Scope (v1)

Resource modules in scope:

- `deployments`
- `secrets`
- `projects`

Out of scope for now:

- advanced retries/backoff config
- browser runtime support
- generalized plugin system
- long-lived backwards compatibility commitments

## Runtime + package posture

- Runtime target: Node.js only
- API style: functional modules
- Business logic style: Effect-first with Promise wrappers

## Configuration and auth

## Required config

- `baseUrl: string`
- auth token resolved by precedence:
  1. explicit `authToken` option
  2. `process.env.MONOLAYER_AUTH_TOKEN`

If neither token source is available, SDK must fail with typed auth/config error before request execution.

## Base URL contract

- Caller passes API origin, for example: `https://api.monolayer.com`
- SDK appends path segments internally (for example `/v1/projects`)

## Security rules

- Never log token values.
- Redact token-like values in debug/error output.
- Use `Authorization: Bearer <token>` for outbound auth header.

## Public API shape

Top-level creation:

```ts
type CreateClientOptions = {
	readonly baseUrl: string;
	readonly authToken?: string;
};

type MonolayerClient = {
	readonly config: {
		readonly baseUrl: string;
	};
	readonly projects: ProjectsApi;
	readonly deployments: DeploymentsApi;
	readonly secrets: SecretsApi;
};

declare const createClient: (options: CreateClientOptions) => MonolayerClient;
```

Module shape:

- Effect-first methods (primary)
- Promise wrappers (convenience)

Pattern:

```ts
type ListResult<T> = {
	readonly items: ReadonlyArray<T>;
	readonly nextCursor?: string;
};

interface DeploymentsApi {
	list: (
		input: ListDeploymentsInput,
	) => Effect.Effect<ListResult<DeploymentDto>, DeploymentError>;
	listPromise: (
		input: ListDeploymentsInput,
	) => Promise<ListResult<DeploymentDto>>;
}
```

## Resource contracts

## Projects

Identity:

- `projectId` only (no slug-based API in v1)

v1 operations:

- `projects.list`

Proposed method contracts:

```ts
type ListProjectsInput = {
	readonly cursor?: string;
	readonly limit?: number;
};
```

## Deployments

v1 operations:

- `deployments.create`
- `deployments.get`
- `deployments.list`

Proposed method contracts:

```ts
type CreateDeploymentInput = {
	readonly projectId: string;
	readonly environmentId?: string;
	readonly sourceRef?: string;
};

type GetDeploymentInput = {
	readonly deploymentId: string;
};

type ListDeploymentsInput = {
	readonly projectId?: string;
	readonly cursor?: string;
	readonly limit?: number;
};
```

## Secrets

v1 operations:

- `secrets.set` (maps to create/update semantics)
- `secrets.list`

Security response rule:

- No secret raw values in responses.
- Return metadata only.

Proposed method contracts:

```ts
type SetSecretInput = {
	readonly projectId: string;
	readonly key: string;
	readonly value: string;
};

type ListSecretsInput = {
	readonly projectId: string;
	readonly cursor?: string;
	readonly limit?: number;
};
```

## DTO and pagination conventions

All list methods return:

```ts
type ListResult<T> = {
	readonly items: ReadonlyArray<T>;
	readonly nextCursor?: string;
};
```

Pagination style:

- cursor-based only in v1

## Error model

Typed domain errors, not generic strings.

Initial error families:

- `AuthError`
- `ConfigError`
- `ValidationError`
- `NotFoundError`
- `RateLimitError`
- `ApiError` (fallback for unexpected upstream failures)
- `TransportError` (network/serialization)

Each error should include:

- stable `tag`/type discriminator
- human message
- optional `statusCode`
- optional request correlation id (if available)

## CLI alignment

CLI commands planned to map to SDK methods:

- `projects:list` -> `projects.list`
- `deployments:create` -> `deployments.create`
- `deployments:list` -> `deployments.list`
- `deployments:get` -> `deployments.get`
- `secrets:set` -> `secrets.set`
- `secrets:list` -> `secrets.list`

Boundary rule:

- Mostly thin CLI over SDK.
- Small CLI-only conveniences are allowed (formatting, prompt helpers, output shaping).

## Mock-first development plan (until API exists)

Yes, mocking is the correct approach now.

Implementation policy:

1. Define stable SDK contracts and DTOs first.
2. Implement transport behind an interface.
3. Provide a mock transport as default for local development/tests until real endpoints land.
4. Keep command behavior stable while swapping only transport adapter later.

Suggested transport abstraction:

```ts
type HttpRequest = {
	readonly method: "GET" | "POST" | "PUT";
	readonly path: string;
	readonly query?: Record<string, string | number | boolean | undefined>;
	readonly body?: unknown;
};

type HttpResponse = {
	readonly status: number;
	readonly body: unknown;
	readonly headers?: Record<string, string>;
};

type Transport = (
	request: HttpRequest,
) => Effect.Effect<HttpResponse, TransportError>;
```

Mock endpoints to emulate:

- `GET /v1/projects`
- `POST /v1/deployments`
- `GET /v1/deployments/:deploymentId`
- `GET /v1/deployments`
- `PUT /v1/projects/:projectId/secrets/:key` (for `secrets.set`)
- `GET /v1/projects/:projectId/secrets`

Mock behavior requirements:

- deterministic fixtures
- cursor pagination simulation (`nextCursor`)
- typed errors for auth/not-found/validation/rate-limit scenarios
- token redaction in all logs/errors

## Evolution plan when real API ships

1. Keep public SDK function signatures and DTOs stable where possible.
2. Replace mock transport with real HTTP transport.
3. Add compatibility tests asserting mock and real adapters behave identically for core scenarios.
4. Mark any contract changes in changelog with pre-1.0 migration notes.
