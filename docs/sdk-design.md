# SDK Design (Current)

This document captures the current contract and architecture for `@monolayer/sdk`.

## Product intent

Primary users:

- Platform engineers
- Automation/agent workflows

Current posture:

- Node.js runtime
- Typed SDK with Effect-first internals
- Small, stable CLI command surface

## Current scope

SDK modules available:

- `projects`
- `deployments`

CLI commands available:

- `projects:list`
- `deployments:deploy`

## Configuration contracts

Create-client options:

```ts
type CreateClientOptions = {
  readonly baseUrl: string;
  readonly authToken?: string;
  readonly transport?: Transport;
};
```

Base URL rules:

- `baseUrl` is required.
- `normalizeBaseUrl(...)` normalizes input to URL origin.

Auth token resolution (`resolveAuthToken`):

1. explicit `authToken` option
2. `process.env.MONOLAYER_AUTH_TOKEN`
3. throw `AuthError`

## Public SDK API shape

```ts
type MonolayerClient = {
  readonly config: { readonly baseUrl: string };
  readonly projects: ProjectsApi;
  readonly deployments: DeploymentsApi;
};
```

Projects API:

- `projects.list(input?)`
- `projects.listPromise(input?)`

Deployments API:

- `deployments.create(input)`
- `deployments.createPromise(input)`
- `deployments.get(input)`
- `deployments.getPromise(input)`
- `deployments.list(input?)`
- `deployments.listPromise(input?)`

List methods return:

```ts
type ListResult<T> = {
  readonly items: ReadonlyArray<T>;
  readonly nextCursor?: string;
};
```

## Transport and request model

Transport contract:

```ts
type Transport = (request: HttpRequest) => Effect.Effect<HttpResponse, TransportError>;
```

Default transport:

- `createHttpTransport(baseUrl)`
- uses global `fetch`
- injects JSON body/header behavior

Request behavior:

- `sendJson(...)` sets `Authorization: Bearer <token>`
- maps HTTP status to typed errors:
  - 401/403 -> `AuthError`
  - 400 -> `ValidationError`
  - 404 -> `NotFoundError`
  - 429 -> `RateLimitError`
  - other -> `ApiError`

## CLI alignment rules

`projects:list`:

- SDK-backed command through `BaseCommand`
- outputs JSON payload to stdout

`deployments:deploy`:

- command-local HTTP flow for trigger + poll behavior
- streams human-readable logs and status

## Testing expectations

- Command contracts are validated in `packages/sdk/test/commands/*`.
- SDK behavior is validated in `packages/sdk/test/sdk/*`.
- Docs should change alongside command/runtime contract changes.
