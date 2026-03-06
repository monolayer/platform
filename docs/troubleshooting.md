# Troubleshooting

## Missing oclif dependency

Symptom:

- `Cannot find module '@oclif/core'`

Checks:

1. `packages/sdk/package.json` includes `@oclif/core` and `@oclif/plugin-help`.
2. Dependencies are installed (`pnpm install`).
3. Workspace lockfile and `node_modules` are in sync.

## Plugin warnings during tests

Symptom:

- warnings mentioning `@oclif/plugin-plugins`

Status:

- Known warning noise in test runs; command tests still pass.

## `base-url` errors in CLI commands

Symptom:

- `Missing base URL. Pass --base-url explicitly or set MONOLAYER_BASE_URL.`

Fix:

1. Pass `--base-url https://your-control-plane-origin`
2. or set `MONOLAYER_BASE_URL` in your shell/CI.

## Auth token errors in `projects:list`

Symptom:

- `Missing auth token. Pass --auth-token explicitly or set MONOLAYER_AUTH_TOKEN.`

Fix:

1. Pass `--auth-token <token>`
2. or set `MONOLAYER_AUTH_TOKEN`.

## `deployments:deploy` fetch failure on localhost HTTPS

Symptom:

- `TypeError: fetch failed` while using `https://localhost:<port>`

Fix:

1. If server is HTTP-only, use `http://localhost:<port>`.
2. If using self-signed HTTPS, trust the cert locally.

## Build succeeds but command is not found

Checks:

1. Command file exists in `packages/sdk/src/commands`.
2. Build output exists in `packages/sdk/dist/commands`.
3. `packages/sdk/package.json` has `oclif.commands = "./dist/commands"`.
4. Verify with `node packages/sdk/dist/cli.mjs --help`.
