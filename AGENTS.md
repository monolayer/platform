# AGENTS.md

## 1. Purpose

This file is the maintainer/agent operational guide for this monorepo.

## 2. Current Scope

- Current CLI surface is locked to:
  - `projects:list`
  - `deployments:deploy`
- Any command-surface expansion must include docs and tests in the same change.

## 3. Repository Map

- `packages/cli`: CLI commands and typed client runtime.
- `packages/cli-docs`: documentation site.
- `docs`: maintainer source-of-truth playbooks.

## 4. Source-of-Truth Docs

Read in this order before making behavior changes:

1. `docs/architecture.md`
2. `docs/adding-commands.md`
3. `docs/effect-patterns.md`
4. `docs/testing.md`
5. `docs/troubleshooting.md`
6. `docs/client-design.md`
7. `packages/cli/DEVELOPMENT_GUIDE.md`

## 5. Non-Negotiable Command Contracts

### `projects:list`

- Output contract: JSON-only stdout.
- Base URL contract:
  - `--base-url`
  - `MONOLAYER_BASE_URL`
- Auth token contract:
  - `--auth-token`
  - `MONOLAYER_AUTH_TOKEN`
- Keep explicit error messages:
  - `Missing base URL. Pass --base-url explicitly or set MONOLAYER_BASE_URL.`
  - `Missing auth token. Pass --auth-token explicitly or set MONOLAYER_AUTH_TOKEN.`

### `deployments:deploy`

- Output contract: human-readable streaming logs/status.
- Token rule: `--auth-token` must start with `deploy_token_`.
- Branch validation: reject `refs/heads/` and `branch/` prefixes.
- Polling contract:
  - use `x-next-since` for incremental polling
  - dedupe status logs (print on change only)
  - suppress blank/whitespace-only log lines
  - fail command on terminal `Failed` status

## 6. Development Workflow

Required checks:

```bash
pnpm -C packages/cli run test
pnpm -C packages/cli run lint
pnpm -C packages/cli run build
```

Focused runs:

- Command-only edits:

```bash
pnpm -C packages/cli exec vitest run test/commands
```

- Client runtime/config/transport edits:

```bash
pnpm -C packages/cli exec vitest run test/client
```

## 7. Documentation Sync Rules

When CLI behavior changes, update all relevant docs in the same PR:

- `packages/cli-docs/content/docs/cli/*`
- `packages/cli-docs/content/docs/authentication.mdx` (if config/auth behavior changes)
- `packages/cli/README.md`
- `packages/cli/DEVELOPMENT_GUIDE.md`

## 8. Known Caveats

- `pnpm -C packages/cli run check-types` currently fails with TS1470 (`import.meta` vs CommonJS type-check mode).
- Test runs may show oclif plugin warning noise for `@oclif/plugin-plugins`; tests can still pass.

## 9. Pre-Commit Checklist

- Run tests, lint, and build; if any pre-existing failure remains, document it explicitly.
- Confirm command contracts, tests, and docs remain synchronized.
- Confirm there are no stale references to removed or unsupported command surfaces.
