# Effect Patterns

## Why Effect here

- Keeps business logic composable and testable.
- Gives strong typing across async workflows.
- Makes it easier to move from simple commands to layered SDK capabilities.

## Pattern used now

- Command parses input with Oclif.
- Business logic is implemented as `Effect`.
- Command executes with `Effect.runPromise(...)`.

Current example:

- `buildHelloMessage(name)` in `src/commands/say-hello.ts`

## Recommended pattern for real SDK logic

1. Put domain operations in `src/sdk/*` or `src/core/*`.
2. Return `Effect.Effect<Success, DomainError, Dependencies>`.
3. Keep parsing and rendering in command class only.

## Error strategy

- Validation/parsing errors: Oclif flags/args mechanisms.
- Domain errors: custom tagged error types in SDK/core modules.
- Command `run()` should map domain errors into user-friendly CLI output.

## Testing strategy with Effect

- Unit test effect functions directly via `Effect.runPromise`.
- Keep effect functions deterministic by injecting dependencies as arguments/layers.
- Avoid putting side effects directly in command classes unless output/logging.
