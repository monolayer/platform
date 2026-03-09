# Platform CLI Docs

This folder contains maintainer documentation for the `@monolayer/cli` monorepo.

## Current CLI scope

The CLI surface in `packages/cli` is intentionally small:

- `projects:list`
- `deployments:deploy`

## Repository map

- `packages/cli`: CLI commands + typed client runtime.
- `packages/cli-docs`: Documentation site (Next.js + Fumadocs).
- `docs`: Maintainer playbooks for architecture, testing, and command work.

## Suggested read order

1. `docs/architecture.md`
2. `docs/adding-commands.md`
3. `docs/effect-patterns.md`
4. `docs/testing.md`
5. `docs/troubleshooting.md`
6. `docs/client-design.md`
7. `docs/references.md`

## Fast local workflow

CLI package checks:

```bash
pnpm -C packages/cli run test
pnpm -C packages/cli run lint
pnpm -C packages/cli run build
```

Run CLI help from build output:

```bash
node packages/cli/dist/cli.mjs --help
```

Run docs site:

```bash
pnpm -C packages/cli-docs run dev
```
