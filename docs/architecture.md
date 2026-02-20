# Architecture

## Current shape

- CLI bootstrap:
  - `src/cli.ts`: Node executable with shebang (supports CJS & ESM)
  - `src/main.ts`: delegates to Oclif `execute()`
- Commands:
  - `src/commands/**/*.ts`
  - Commands are organized by directory structure (e.g., `src/commands/workloads/add/bucket.ts` -> `workloads add bucket`)
  - Each file exports one default Oclif `Command` class
- Shared exports:
  - `src/index.ts` exports reusable pieces for SDK consumers/tests
- Build System:
  - `tsdown` builds both CommonJS and ESM outputs to `dist/`
  - Bundles dependencies that are ESM-only for CJS compatibility

## Design principles

1. Oclif owns CLI concerns.
2. Effect owns application logic composition.
3. Command classes should parse flags, call domain logic, and format output only.
4. SDK modules should be pure or effectful without hard dependency on Oclif APIs.

## Package wiring

- `package.json`:
  - `oclif.bin = "monolayer"`
  - `oclif.commands = "./dist/commands"`
  - `bin.monolayer = "./dist/cli.mjs"`
  - `main = "./dist/index.mjs"`
  - `module = "./dist/index.mjs"`
- Build emits `dist/**` from `src/**` using `tsdown`.

## Suggested module boundaries for future growth

- `src/commands/*`:
  - CLI-only command parsing/output
- `src/sdk/*`:
  - shared APIs used by CLI and external consumers
- `src/core/*`:
  - domain workflows, schemas, validations, errors
- `src/adapters/*`:
  - HTTP, filesystem, env, auth token loading
