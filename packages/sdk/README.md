# Monolayer CLI and SDK (packages/sdk)

This package ships:
- A CLI binary: `monolayer`
- A typed SDK client used by CLI commands

Maintainer-focused development playbook:
- `DEVELOPMENT_GUIDE.md`

Current CLI scope is intentionally small:
- `projects:list`
- `deployments:deploy`

## Quick Start

Install dependencies and run commands from this package:

```bash
pnpm -C packages/sdk install
pnpm -C packages/sdk exec monolayer projects:list --base-url https://control-plane-domain --auth-token <token>
pnpm -C packages/sdk exec monolayer deployments:deploy --base-url https://control-plane-domain --auth-token deploy_token_xxx --project-id proj-1
```

Build and test:

```bash
pnpm -C packages/sdk run build
pnpm -C packages/sdk run test
```

## Command Reference

## `projects:list`

Lists projects with cursor-based pagination.

Flags:
- `--base-url <url>`: Control plane origin. Falls back to `MONOLAYER_BASE_URL`.
- `--auth-token <token>`: Auth token. Falls back to `MONOLAYER_AUTH_TOKEN`.
- `--cursor <cursor>`: Pagination cursor.
- `--limit <n>`: Max number of items. Default `50`.

Behavior:
- Always outputs JSON to stdout.
- Returns API payload shape:
  - `items: ProjectDto[]`
  - `nextCursor?: string`

Example:

```bash
MONOLAYER_BASE_URL="https://control-plane-domain" \
MONOLAYER_AUTH_TOKEN="token_xxx" \
monolayer projects:list --limit 10
```

## `deployments:deploy`

Triggers deployment for a branch, then polls and streams logs.

Flags:
- `--base-url <url>`: Control plane origin. Falls back to `MONOLAYER_BASE_URL`.
- `--auth-token <token>`: Deployment token. Falls back to `MONOLAYER_DEPLOYMENT_TOKEN`.
- `--project-id <id>`: Project identifier (required).
- `--branch-name <name>`: Branch to deploy. If omitted, auto-detected from current git repo.
- `--poll-interval-ms <n>`: Poll interval in milliseconds. Default `2000`.

Behavior:
- Validates token prefix: `deploy_token_`.
- Rejects branch names starting with `refs/heads/` or `branch/`.
- Trigger endpoint: `POST /sdk/deployments` with `{ branchName }`.
- Poll endpoint: `GET /sdk/projects/{projectId}/deployments/{deploymentNumber}`.
- Uses `x-next-since` response header for incremental polling.
- Prints log lines with timestamps.
- Skips blank/whitespace log events.
- Prints deployment status only when it changes.
- Exits with error if terminal status is `Failed`.

Debug mode:
- If `DEBUG=1`, `sendJsonRequest` prints request metadata with redacted token.

Example:

```bash
MONOLAYER_BASE_URL="https://control-plane-domain" \
MONOLAYER_DEPLOYMENT_TOKEN="deploy_token_xxx" \
monolayer deployments:deploy --project-id proj-1 --branch-name main
```

## Configuration and Precedence

Base URL:
- CLI commands accept `--base-url`.
- Both commands also read `MONOLAYER_BASE_URL`.
- If neither is set, commands throw:
  - `Missing base URL. Pass --base-url explicitly or set MONOLAYER_BASE_URL.`

Auth token:
- `projects:list` token precedence:
  1. `--auth-token`
  2. `MONOLAYER_AUTH_TOKEN`
  3. `Missing auth token. Pass --auth-token explicitly or set MONOLAYER_AUTH_TOKEN.`
- `deployments:deploy` token precedence:
  1. `--auth-token`
  2. `MONOLAYER_DEPLOYMENT_TOKEN`
  3. oclif required-flag error

Note:
- Auth env variable names differ between commands by design in current code.

## Output Model

CLI output is command-specific:
- `projects:list`: JSON payload output.
- `deployments:deploy`: streaming human-readable logs and status lines.

SDK output (programmatic client):
- Exposes typed `Effect` and Promise APIs for `projects` and `deployments`.

## Architecture

High-level flow:

1. `src/cli.ts` is the node entrypoint.
2. `src/main.ts` calls `@oclif/core.execute(...)`.
3. oclif loads command classes from `dist/commands`.
4. Commands either:
   - Call SDK client abstractions (`projects:list`), or
   - Call HTTP directly for specialized flow (`deployments:deploy`).

### Code Layout

CLI:
- `src/cli.ts`: executable entrypoint.
- `src/main.ts`: oclif bootstrap.
- `src/base-command.ts`: shared flags and SDK client wiring.
- `src/commands/projects/list.ts`: projects list command.
- `src/commands/deployments/deploy.ts`: deployment trigger + polling command.

SDK core:
- `src/sdk/client.ts`: constructs runtime + API groups.
- `src/sdk/config.ts`: base URL normalization + auth token resolution.
- `src/sdk/request.ts`: maps HTTP statuses to typed SDK errors.
- `src/sdk/http-transport.ts`: fetch-based transport implementation.
- `src/sdk/mock-transport.ts`: deterministic transport for tests.
- `src/sdk/projects.ts`: projects API methods.
- `src/sdk/deployments.ts`: deployments API methods.
- `src/sdk/types.ts`: DTOs + API interfaces.
- `src/sdk/errors.ts`: typed error model.

### SDK Layering

`createClient(options)`:
- Normalizes base URL (`origin` only).
- Resolves token from explicit arg or env.
- Selects transport:
  - default HTTP transport
  - injected transport (used by tests)
- Returns grouped APIs:
  - `projects`
  - `deployments`

Request path:
- API method builds `HttpRequest`.
- `sendJson` injects `Authorization: Bearer ...`.
- Transport executes request.
- Non-2xx responses map to typed errors:
  - `AuthError`, `ValidationError`, `NotFoundError`, `RateLimitError`, `ApiError`.

## Testing Strategy

Test framework:
- `vitest`

Test files:
- `test/commands/projects-list.test.ts`
- `test/commands/deployments-deploy.test.ts`
- `test/sdk/config.test.ts`
- `test/sdk/client.test.ts`

### Command Tests

Approach:
- Mock `fetch`.
- Capture stdout with `process.stdout.write` spy.
- Execute command class directly via `CommandClass.run([...args])`.

Coverage includes:
- JSON output behavior (`projects:list`).
- `MONOLAYER_BASE_URL` fallback for both commands.
- Helpful missing-base-url error message.
- Helpful missing-auth-token error message for `projects:list`.
- `--json` rejection in JSON-only command paths.
- Deploy trigger and poll lifecycle.
- Incremental polling (`x-next-since` handling).
- Log formatting and blank-line suppression.
- Status-change deduplication.
- Branch detection fallback to git.
- Failure modes (queued, failed, no git repo, localhost fetch hint).

### SDK Tests

`config.test.ts`:
- Base URL normalization.
- Invalid base URL failures.
- Auth token precedence (`explicit > env`).
- Missing auth token failure.

`client.test.ts`:
- Client config normalization.
- Default HTTP transport path.
- Mock transport behavior for projects and deployments.
- Pagination/filtering behavior.
- Typed error assertions (`NotFoundError`).

## Development Workflow

Recommended local checks:

```bash
pnpm -C packages/sdk run test
pnpm -C packages/sdk run lint
pnpm -C packages/sdk run build
```

Useful focused runs:

```bash
pnpm -C packages/sdk exec vitest run test/commands/deployments-deploy.test.ts
pnpm -C packages/sdk exec vitest run test/commands/projects-list.test.ts
pnpm -C packages/sdk exec vitest run test/sdk/client.test.ts
```

## Known Caveats

- `pnpm -C packages/sdk run check-types` currently fails due `import.meta` in `src/main.ts` under current CommonJS type-check output settings.
- Running tests may print oclif plugin warnings about `@oclif/plugin-plugins`; tests still pass.

## Extending the CLI

When adding a command:
- Add command file under `src/commands/<group>/<name>.ts`.
- Prefer reusing `BaseCommand` for shared `base-url` and `auth-token` behavior.
- Keep output mode explicit (JSON or human logs) and test it.
- Add command tests that validate:
  - env fallback behavior
  - request path/method/body
  - error messaging for missing required config
  - stdout behavior
