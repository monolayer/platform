# Testing Guide

## Current tests

- Unit tests for commands (`test/commands/**/*`)
  - Mocked dependencies (prompts, filesystem, docker, etc.)
  - Verifies flags, arguments, and correct function calls
- Integration tests (`test/integration/*`)
  - `workload-lifecycle.test.ts`: Tests `local start`, `status`, and `stop` with real Docker containers (using `testcontainers` and `dockerode`) to verify the full end-to-end flow.

## Test patterns

1. **Unit Tests:**
   - Call command classes with `CommandClass.run([...args])`.
   - Mock internal modules (`~/scan/workload-imports.js`, `~/containers/...`) to avoid side effects.
   - Use `vi.mock` for external dependencies like `prompts` or `ora`.

2. **Integration Tests:**
   - Use sparingly for critical paths (like container lifecycle).
   - Ensure proper cleanup (e.g., stopping containers) in `afterEach`.
   - Can interact with real system resources (Docker, Filesystem) but should run in a temporary/isolated context where possible.

3. **General:**
   - Capture `process.stdout.write`/`process.stderr.write` for output assertions if needed.
   - Set `process.env.NODE_ENV = "production"` for Oclif tests to reduce dev plugin noise.

## Commands

```bash
pnpm --filter @monolayer/control-plane-sdk test
pnpm --filter @monolayer/control-plane-sdk test:watch
```

## When to add integration tests

Add integration tests once commands start using:

- remote APIs
- authentication/token flow
- file system reads/writes (critical paths)
- multi-step workflows (like start -> check status -> stop)

At that point, prefer a dedicated integration test suite that exercises the logic as close to the real user experience as possible.
