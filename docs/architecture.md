# Architecture

## Current shape

CLI bootstrap:

- `packages/sdk/src/cli.ts`: executable entrypoint.
- `packages/sdk/src/main.ts`: calls `@oclif/core.execute(...)`.
- `packages/sdk/src/commands/**/*.ts`: command classes discovered by oclif at runtime.

Shared CLI wiring:

- `packages/sdk/src/base-command.ts`: common flags and SDK client construction for SDK-backed commands.

SDK core:

- `packages/sdk/src/sdk/client.ts`: runtime construction + API groups.
- `packages/sdk/src/sdk/config.ts`: base URL normalization + auth token resolution.
- `packages/sdk/src/sdk/http-transport.ts`: fetch transport.
- `packages/sdk/src/sdk/mock-transport.ts`: deterministic in-memory transport for tests.
- `packages/sdk/src/sdk/request.ts`: maps HTTP statuses to typed SDK errors.
- `packages/sdk/src/sdk/projects.ts`: projects API methods.
- `packages/sdk/src/sdk/deployments.ts`: deployments API methods.

## Command execution styles

The package currently uses two command patterns:

1. SDK-backed command
- Example: `projects:list`
- Uses `BaseCommand.createSdkClient(...)` and SDK methods.

2. Command-local fetch flow
- Example: `deployments:deploy`
- Uses local request helper for trigger + poll + log streaming behavior.

This split is intentional for now because deployment polling has command-specific output/looping requirements.

## Build and package wiring

`packages/sdk/package.json`:

- `bin.monolayer = "./dist/cli.mjs"`
- `oclif.bin = "monolayer"`
- `oclif.commands = "./dist/commands"`

`packages/sdk/tsdown.config.esm.ts`:

- entry points: `src/cli.ts`, `src/commands/**/*.ts`
- output format: ESM (`dist/*.mjs`)

## Design principles

1. Keep command classes focused on parsing, orchestration, and output.
2. Keep reusable API logic in `src/sdk/*`.
3. Preserve explicit output contracts (JSON-only vs human log streams).
4. Treat tests and docs as part of the command contract.
