# Testing Guide

## Current tests

Command tests:

- `packages/cli/test/commands/projects-list.test.ts`
- `packages/cli/test/commands/deployments-deploy.test.ts`

Client tests:

- `packages/cli/test/client/config.test.ts`
- `packages/cli/test/client/client.test.ts`

## Test patterns

1. Command tests
- Call command classes with `CommandClass.run([...args])`.
- Stub `fetch` for HTTP behavior.
- Capture stdout with `process.stdout.write` spies.
- Verify exact URL/method/body contracts where possible.

2. Client tests
- Test pure config helpers directly (`normalizeBaseUrl`, `resolveAuthToken`).
- Use `createMockTransport()` for deterministic API scenarios.
- Assert typed errors for failure paths.

3. Environment hygiene
- Restore env vars after each test.
- Reset global stubs/mocks between tests.

## Commands

```bash
pnpm -C packages/cli run test
pnpm -C packages/cli run test:watch
```

Focused runs:

```bash
pnpm -C packages/cli exec vitest run test/commands/projects-list.test.ts
pnpm -C packages/cli exec vitest run test/commands/deployments-deploy.test.ts
pnpm -C packages/cli exec vitest run test/client/client.test.ts
```
