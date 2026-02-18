# Testing Guide

## Current tests

- `test/commands/say-hello.test.ts`
  - effect function behavior
  - command output behavior
  - JSON output mode
  - unknown flag failure

## Test patterns

1. Call command classes with `CommandClass.run([...args])`.
2. Capture `process.stdout.write`/`process.stderr.write` for output assertions.
3. Set `process.env.NODE_ENV = "production"` for Oclif tests to reduce dev plugin noise.
4. Validate both human output and JSON output where `enableJsonFlag` is enabled.

## Commands

```bash
pnpm --filter @monolayer/control-plane-sdk test
pnpm --filter @monolayer/control-plane-sdk test:watch
```

## When to add integration tests

Add integration tests once commands start using:

- remote APIs
- authentication/token flow
- file system reads/writes
- multi-step workflows

At that point, prefer a dedicated integration test suite that exercises `dist/cli.js` as a subprocess.
