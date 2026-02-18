# Troubleshooting

## Oclif dependency not found

Symptom:

- `Cannot find module '@oclif/core'`

Checks:

1. `package.json` has `@oclif/core` and `@oclif/plugin-help` in `dependencies`.
2. `pnpm install` completed successfully for the workspace.
3. `pnpm-lock.yaml` includes the same versions required by this package.

## Oclif tests noisy about plugin resolution

Symptom:

- warnings about missing `@oclif/plugin-plugins` in test output

Workaround currently used:

- set `process.env.NODE_ENV = "production"` in tests before invoking command classes.

## Local registry issues

Symptom:

- package installs fail due `registry=http://localhost:4873`

What to do:

1. Ensure the local registry is running if that workflow is intended.
2. If using public registry for this package, override registry for install commands.
3. Re-run `pnpm install` to refresh links when dependency graph changes.

## pnpm store mismatch

Symptom:

- `ERR_PNPM_UNEXPECTED_STORE`

What to do:

1. Reuse the store that existing `node_modules` was linked from, or
2. perform a clean reinstall with the desired store directory.

## Build is green but CLI command missing

Checks:

1. command file is under `src/commands`.
2. build output has matching file in `dist/commands`.
3. `package.json` `oclif.commands` points to `./dist/commands`.
4. run `node dist/cli.js --help` and verify command list.
