# Effect Patterns

## Why Effect is used in SDK modules

- Encodes success/error channels with explicit types.
- Keeps API logic composable and testable.
- Supports both Effect-first and Promise-first call sites.

## Pattern used in this repository

- Commands parse flags and format output.
- SDK modules (`packages/sdk/src/sdk/*`) implement request logic with `Effect`.
- SDK APIs expose:
  - Effect methods (primary)
  - Promise wrappers (convenience)

Example:

- `projects.list(...)` returns `Effect<...>`
- `projects.listPromise(...)` calls `Effect.runPromise(...)`

## Error strategy

- CLI validation errors: command-level (`this.error(...)` with actionable guidance).
- SDK request errors: typed tagged errors (`AuthError`, `ValidationError`, `NotFoundError`, etc.).
- Transport failures: `TransportError` with request context.

## Testing guidance

1. Test command behavior directly with `CommandClass.run([...args])`.
2. Test SDK behavior with mock transport and `Effect.runPromise(...)`.
3. Keep SDK modules free of CLI concerns so tests stay deterministic.
