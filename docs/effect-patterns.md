# Effect Patterns

## Why Effect is used in client modules

- Encodes success/error channels with explicit types.
- Keeps API logic composable and testable.
- Supports both Effect-first and Promise-first call sites.

## Pattern used in this repository

- Commands parse flags and format output.
- Client modules (`packages/cli/src/client/*`) implement request logic with `Effect`.
- Client APIs expose:
  - Effect methods (primary)
  - Promise wrappers (convenience)

Example:

- `projects.list(...)` returns `Effect<...>`
- `projects.listPromise(...)` calls `Effect.runPromise(...)`

## Error strategy

- CLI validation errors: command-level (`this.error(...)` with actionable guidance).
- Client request errors: typed tagged errors (`AuthError`, `ValidationError`, `NotFoundError`, etc.).
- Transport failures: `TransportError` with request context.

## Testing guidance

1. Test command behavior directly with `CommandClass.run([...args])`.
2. Test client behavior with mock transport and `Effect.runPromise(...)`.
3. Keep client modules free of CLI concerns so tests stay deterministic.
