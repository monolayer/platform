# SDK/CLI Development Guide (Maintainer Playbook)

This document is for future maintainers working in `packages/sdk`.

It is intentionally implementation-heavy and assumes you are making code changes, not just using the CLI.

As of **2026-03-05**, CLI surface is intentionally minimal:
- `projects:list`
- `deployments:deploy`

## 1. Goals and Non-Goals

Goals:
- Keep CLI behavior predictable and testable.
- Keep command behavior explicit (especially stdout/error contracts).
- Keep API request paths and payload contracts easy to audit.
- Keep SDK typed errors stable.

Non-goals (current scope):
- Large command surface with many command groups.
- Rich TUI output.
- Multiple output modes per command (for existing commands, behavior is explicit and fixed).

## 2. Current Package Map

Core package files:
- `src/cli.ts`: node executable entrypoint
- `src/main.ts`: oclif bootstrap (`execute`)
- `src/base-command.ts`: shared flags and SDK client helper

Commands:
- `src/commands/projects/list.ts`
- `src/commands/deployments/deploy.ts`

SDK internals:
- `src/sdk/client.ts`: runtime wiring
- `src/sdk/config.ts`: config normalization and auth token resolution
- `src/sdk/request.ts`: status-to-error mapping
- `src/sdk/http-transport.ts`: fetch transport
- `src/sdk/mock-transport.ts`: in-memory fake transport for tests
- `src/sdk/projects.ts`: projects API
- `src/sdk/deployments.ts`: deployments API
- `src/sdk/types.ts`: DTO and API types
- `src/sdk/errors.ts`: typed error classes
- `src/sdk/runtime.ts`, `src/sdk/transport.ts`: wiring types

Tests:
- `test/commands/projects-list.test.ts`
- `test/commands/deployments-deploy.test.ts`
- `test/sdk/config.test.ts`
- `test/sdk/client.test.ts`

## 3. Runtime Architecture

### 3.1 CLI boot flow

1. `src/cli.ts` reads argv and calls `runCli(args)`.
2. `src/main.ts` calls `@oclif/core.execute`.
3. oclif discovers commands from `dist/commands` (configured in `package.json`).
4. Command class `run()` is executed.

Important:
- Build output must include command files (`tsdown.config.esm.ts` entry includes `src/commands/**/*.ts`).

### 3.2 Two execution styles (important)

There are two patterns in this package:

1. SDK-backed command pattern:
- Example: `projects:list`
- Command uses `BaseCommand.createSdkClient(...)`
- Requests go through SDK layers (`sendJson`, typed error mapping, transport abstraction)

2. Custom command-local HTTP pattern:
- Example: `deployments:deploy`
- Command uses a local `sendJsonRequest` helper directly with `fetch`
- Needed because command performs a specialized trigger + poll loop and streaming log output

Do not force both commands into one pattern unless you re-validate behavior and tests.

## 4. Command Contracts (Behavioral Invariants)

Treat these as API contracts. If they change, tests/docs must change in the same PR.

### 4.1 `projects:list`

File:
- `src/commands/projects/list.ts`

Contract:
- Always outputs JSON to stdout.
- No human table rendering.
- `--json` is rejected by oclif (no `enableJsonFlag` on command).

Flags:
- `--base-url` (or `MONOLAYER_BASE_URL`)
- `--auth-token` (or `MONOLAYER_AUTH_TOKEN`)
- `--cursor`
- `--limit` (default `50`)

Failure contract:
- If base URL missing from both flag and env:
  - `Missing base URL. Pass --base-url explicitly or set MONOLAYER_BASE_URL.`

API contract:
- GET `/sdk/projects`
- Query params: `cursor`, `limit` when provided

### 4.2 `deployments:deploy`

File:
- `src/commands/deployments/deploy.ts`

Contract:
- Human-readable streaming output (not JSON payload output).
- Trigger deployment by branch name.
- Poll logs/status until terminal state.

Flags:
- `--base-url` (or `MONOLAYER_BASE_URL`)
- `--auth-token` (or `MONOLAYER_DEPLOYMENT_TOKEN`)
- `--project-id` (required)
- `--branch-name` (optional; fallback to current git branch)
- `--poll-interval-ms` (default `2000`, min `0`)

Validation invariants:
- `auth-token` must start with `deploy_token_`.
- If branch is auto-detected or passed with prefixes `refs/heads/` or `branch/`, fail.
- Missing base URL error message must explicitly mention `--base-url` and `MONOLAYER_BASE_URL`.

Trigger request contract:
- POST `/sdk/deployments`
- Body: `{ branchName }`

Trigger response handling:
- `type: "skipped"`: print skip message and stop.
- `type: "queued"`: print queued message and stop.
- `type: "triggered"`: start polling.

Poll request contract:
- GET `/sdk/projects/{projectId}/deployments/{deploymentNumber}`
- If `x-next-since` is returned and non-empty, send `?since=...` on next poll.

Polling invariants:
- Print only fresh (deduplicated) logs.
- Dedup key is `eventId` when available, else composite timestamp/group/stream/message.
- Trim trailing `\r\n` from log message.
- Skip blank/whitespace-only log lines.
- Print status only once per distinct value (status-change dedupe).
- Terminal statuses: `Finished`, `Failed`, `Queued`.
- If terminal status is `Failed`, exit with error.

Debug invariants:
- If `DEBUG=1`, command logs request details from `sendJsonRequest`.
- Deployment token is redacted in debug output.

Network error invariants:
- Localhost HTTPS failures include actionable hint (HTTP vs TLS trust guidance).

## 5. Config and Precedence Matrix

### 5.1 Base URL

Both commands:
- `--base-url` takes precedence over env fallback.
- Env fallback: `MONOLAYER_BASE_URL`.
- If missing from both:
  - custom command error (not generic oclif missing-flag message).

### 5.2 Auth token (important asymmetry)

`projects:list`:
1. `--auth-token`
2. `MONOLAYER_AUTH_TOKEN`
3. `AuthError`

`deployments:deploy`:
1. `--auth-token`
2. `MONOLAYER_DEPLOYMENT_TOKEN`
3. oclif required-flag style failure

This asymmetry is intentional in current code. If you standardize env names later, update:
- command flags
- docs
- tests

## 6. SDK Layer (Programmatic Client)

`createClient(options)` in `src/sdk/client.ts`:
- `normalizeBaseUrl(options.baseUrl)` -> origin-only URL
- `resolveAuthToken(options.authToken)` -> explicit token or env token
- transport:
  - provided transport (tests/injected)
  - else `createHttpTransport(baseUrl)`

### 6.1 Transport abstraction

`Transport` type:
- `(request: HttpRequest) => Effect<HttpResponse, TransportError>`

This keeps SDK methods deterministic and testable without network.

### 6.2 Error mapping in SDK requests

`sendJson` maps HTTP status:
- 401/403 -> `AuthError`
- 400 -> `ValidationError`
- 404 -> `NotFoundError`
- 429 -> `RateLimitError`
- else -> `ApiError`

Include `x-request-id` when present.

## 7. Testing Strategy (Current)

Framework:
- `vitest` with single worker (`maxWorkers: 1`, `fileParallelism: false`)

### 7.1 Command tests

Techniques:
- Stub `fetch`.
- Capture stdout by spying `process.stdout.write`.
- Run command class directly via `CommandClass.run([...])`.

What must stay covered:
- Env fallback for base URL.
- Helpful missing-base-url message.
- Deploy poll mechanics (`since`, status dedupe, blank log suppression).
- Branch fallback behavior (inside/outside git repo).
- Localhost fetch failure hint.
- `--json` rejection behavior where expected.

### 7.2 SDK tests

`test/sdk/config.test.ts`:
- URL normalization and auth token precedence.

`test/sdk/client.test.ts`:
- Default HTTP transport behavior with stubbed `fetch`.
- Mock transport scenarios for projects/deployments.
- Typed error behavior (`NotFoundError`).

### 7.3 What to run depending on change

If you changed command parsing/output:
- `pnpm -C packages/sdk exec vitest run test/commands`

If you changed SDK runtime/config/transport:
- `pnpm -C packages/sdk exec vitest run test/sdk`

If unsure:
- `pnpm -C packages/sdk run test`

## 8. Change Playbooks

### 8.1 Add a new command

1. Create file under `src/commands/<group>/<name>.ts`.
2. Decide style:
   - SDK-backed via `BaseCommand`, or
   - command-local fetch flow
3. Define flags and env fallback explicitly.
4. Define output contract clearly (JSON-only vs human logs).
5. Add tests for:
   - happy path
   - missing required config
   - precedence/env fallback
   - failure paths
6. Add/update docs in both:
   - `README.md` (user-facing)
   - this guide (maintainer-facing)

### 8.2 Change endpoint path/payload

1. Update command or SDK API method.
2. Update tests that assert URL/path/body.
3. Run targeted command + sdk tests.
4. Verify no stale old-path references remain (`rg`).

### 8.3 Change stdout behavior

Treat as breaking unless explicitly intended.

Checklist:
1. Update tests capturing stdout.
2. Review docs for output expectations.
3. If changing deploy log cadence/status prints, ensure status dedupe and blank-line handling remains intentional.

### 8.4 Change env var behavior

1. Update flag `env` bindings.
2. Update precedence docs.
3. Add/adjust env-specific tests.
4. Verify missing-config error text remains actionable.

## 9. Coding Conventions Used Here

- TypeScript strict mode is enabled.
- Prefer explicit domain types in `src/sdk/types.ts`.
- Prefer small pure helpers for data normalization.
- Avoid hidden output branching; keep command output mode explicit.
- Keep command errors user-actionable (what to pass/set next).

For tests:
- Restore env vars after each test.
- Keep mock HTTP responses concise and contract-focused.
- Assert exact URLs/methods for endpoint regressions.

## 10. Known Sharp Edges and Current Quirks

### 10.1 `check-types` current failure

`pnpm -C packages/sdk run check-types` currently fails with:
- `TS1470` in `src/main.ts` (`import.meta` with current CommonJS type-check output mode)

This is pre-existing. Do not block unrelated changes on this unless you are fixing tooling configuration.

### 10.2 oclif plugin warning during tests

Full test runs may print warnings about missing `@oclif/plugin-plugins` package metadata. Tests still pass; this is noisy but not currently failing.

### 10.3 Auth env var inconsistency

Projects and deployments commands use different env fallback vars for auth tokens. This is currently documented and tested.

## 11. Debugging Cookbook

### 11.1 Inspect deploy requests

Set debug mode:

```bash
DEBUG=1 monolayer deployments:deploy ...
```

This prints `sendJsonRequest` method/url/headers/body with token redaction.

### 11.2 Debug localhost fetch failures

If using `https://localhost:...` and fetch fails:
- ensure server actually serves HTTPS
- if server is HTTP-only, use `http://localhost:...`
- if self-signed HTTPS, trust cert locally or set `NODE_TLS_REJECT_UNAUTHORIZED=0` only for local debugging

### 11.3 Verify command behavior quickly

Projects:

```bash
MONOLAYER_BASE_URL=https://control-plane-domain \
MONOLAYER_AUTH_TOKEN=test-token \
pnpm -C packages/sdk exec monolayer projects:list --limit 1
```

Deploy:

```bash
MONOLAYER_BASE_URL=https://control-plane-domain \
MONOLAYER_DEPLOYMENT_TOKEN=deploy_token_test \
pnpm -C packages/sdk exec monolayer deployments:deploy --project-id proj-1 --branch-name main --poll-interval-ms 0
```

## 12. CI/Pre-Commit Checklist (Manual)

Before opening a PR:

1. Run targeted tests for touched area.
2. Run full package tests:
   - `pnpm -C packages/sdk run test`
3. Run lint:
   - `pnpm -C packages/sdk run lint`
4. Ensure docs are updated if behavior changed.
5. Confirm no accidental command-surface expansion.
6. Confirm no stale dead code (use `rg` after refactors).

## 13. Future Improvement Backlog (Suggested)

- Standardize auth env var names across commands.
- Reduce oclif warning noise in tests.
- Fix `check-types` CJS/import.meta mismatch.
- Consider centralizing command-local fetch logic if more polling commands appear.
- Add golden-style output snapshots for CLI stdout contracts.

## 14. Decision Log Notes (Current State)

- CLI scope intentionally reduced to projects + deployments for maintainability.
- `projects:list` is JSON-only by default.
- `deployments:deploy` remains human-log-streaming command.
- Base URL guidance intentionally explicit in error messaging to reduce setup friction.

