# Architecture

## Current shape

CLI bootstrap:

- `packages/cli/src/cli.ts`: executable entrypoint.
- `packages/cli/src/main.ts`: calls `@oclif/core.execute(...)`.
- `packages/cli/src/commands/**/*.ts`: command classes discovered by oclif at runtime.

Shared CLI wiring:

- `packages/cli/src/base-command.ts`: common flags and client construction for client-backed commands.

Client core:

- `packages/cli/src/client/client.ts`: runtime construction + API groups.
- `packages/cli/src/client/config.ts`: base URL normalization + auth token resolution.
- `packages/cli/src/client/http-transport.ts`: fetch transport.
- `packages/cli/src/client/mock-transport.ts`: deterministic in-memory transport for tests.
- `packages/cli/src/client/request.ts`: maps HTTP statuses to typed client errors.
- `packages/cli/src/client/projects.ts`: projects API methods.
- `packages/cli/src/client/deployments.ts`: deployments API methods.

## Command execution styles

The package currently uses two command patterns:

1. Client-backed command
- Example: `projects:list`
- Uses `BaseCommand.createClient(...)` and client methods.

2. Command-local fetch flow
- Example: `deployments:deploy`
- Uses local request helper for trigger + poll + log streaming behavior.

This split is intentional for now because deployment polling has command-specific output/looping requirements.

## Build and package wiring

`packages/cli/package.json`:

- `bin.monolayer = "./dist/cli.mjs"`
- `oclif.bin = "monolayer"`
- `oclif.commands = "./dist/commands"`

`packages/cli/tsdown.config.esm.ts`:

- entry points: `src/cli.ts`, `src/commands/**/*.ts`
- output format: ESM (`dist/*.mjs`)

## Design principles

1. Keep command classes focused on parsing, orchestration, and output.
2. Keep reusable API logic in `src/client/*`.
3. Preserve explicit output contracts (JSON-only vs human log streams).
4. Treat tests and docs as part of the command contract.
