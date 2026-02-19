# Control Plane SDK + CLI Docs

This folder is a continuation guide for developing `@monolayer/control-plane-sdk`.

## What exists today

- Oclif-powered CLI entrypoint (`src/cli.ts`, `src/main.ts`)
- CLI commands organized by topic:
  - `workloads:add:*` (Scaffold new workloads like postgres, cron, bucket, etc.)
  - `workloads:build` (Build workloads and generate manifest)
  - `workloads:pull` (Pull container images for defined workloads)
  - `local:start:dev` & `local:start:test` (Launch workloads in local containers)
  - `local:stop:dev` & `local:stop:test` (Stop local workload containers)
  - `local:status:dev` & `local:status:test` (Check status of local workload containers)
  - `local:trigger:cron` (Trigger a local cron workload)
  - `deployments:create|get|list`
  - `projects:list`
  - `secrets:set|list`
- Effect-first SDK methods with Promise wrappers
- Vitest coverage:
  - Unit tests for commands (`test/commands/*`)
  - Integration tests for full workload lifecycle (`test/integration/*`)
- Dual-build support (CJS + ESM) via `tsup`

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
- Maintain integration tests as features grow.
