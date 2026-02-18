# Control Plane SDK + CLI Docs

This folder is a continuation guide for developing `@monolayer/control-plane-sdk`.

## What exists today

- Oclif-powered CLI entrypoint (`src/cli.ts`, `src/main.ts`)
- SDK client factory with mock transport-backed modules:
  - `projects.list`
  - `deployments.create|get|list`
  - `secrets.set|list`
- CLI commands:
  - `projects:list`
  - `deployments:create`
  - `deployments:get`
  - `deployments:list`
  - `secrets:set`
  - `secrets:list`
- Effect-first SDK methods with Promise wrappers
- Vitest coverage for SDK and command behavior (`test/sdk/*`, `test/commands/*`)

## Read this first

1. `docs/architecture.md`
2. `docs/adding-commands.md`
3. `docs/effect-patterns.md`
4. `docs/testing.md`
5. `docs/troubleshooting.md`
6. `docs/sdk-design.md`
7. `docs/references.md`

## Fast local workflow

```bash
pnpm --filter @monolayer/control-plane-sdk check-types
pnpm --filter @monolayer/control-plane-sdk test
pnpm --filter @monolayer/control-plane-sdk build
node packages/control-plane-sdk/dist/cli.js --help
```

## Short roadmap

- Keep command classes thin; move real work to reusable SDK modules.
- Add `src/sdk/*` modules for API client logic.
- Keep all side effects at boundaries (CLI command `run()` and dedicated IO/adapters).
- Add integration tests once command count and SDK surface grow.
