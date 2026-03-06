# Platform SDK + CLI Docs

This folder contains maintainer documentation for the `@monolayer/sdk` monorepo.

## Current CLI scope

The CLI surface in `packages/sdk` is intentionally small:

- `projects:list`
- `deployments:deploy`

## Repository map

- `packages/sdk`: CLI commands + typed SDK runtime.
- `packages/fumadocs`: Documentation site (Next.js + Fumadocs).
- `docs`: Maintainer playbooks for architecture, testing, and command work.

## Suggested read order

1. `docs/architecture.md`
2. `docs/adding-commands.md`
3. `docs/effect-patterns.md`
4. `docs/testing.md`
5. `docs/troubleshooting.md`
6. `docs/sdk-design.md`
7. `docs/references.md`

## Fast local workflow

SDK package checks:

```bash
pnpm -C packages/sdk run test
pnpm -C packages/sdk run lint
pnpm -C packages/sdk run build
```

Run CLI help from build output:

```bash
node packages/sdk/dist/cli.mjs --help
```

Run docs site:

```bash
pnpm -C packages/fumadocs run dev
```
