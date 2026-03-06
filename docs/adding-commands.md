# Adding Commands

## Checklist

1. Create a file in `packages/sdk/src/commands/<topic>/<action>.ts`.
   - Example: `packages/sdk/src/commands/projects/list.ts` -> `projects:list`
2. Export a default class extending `Command` (or `BaseCommand` when SDK-backed).
3. Define `summary`, `description`, `examples`, and `flags`.
4. Keep `run()` orchestration-focused.
5. Make output mode explicit and stable.
   - JSON-only commands should always emit JSON.
   - Human commands should keep concise, deterministic log lines.
6. Add tests in `packages/sdk/test/commands/*`.
7. Update docs in all of:
   - `packages/fumadocs/content/docs/cli/*`
   - `packages/sdk/README.md`
   - `packages/sdk/DEVELOPMENT_GUIDE.md`

## Choose command style deliberately

1. SDK-backed style (preferred default)
- Extend `BaseCommand`.
- Use `this.createSdkClient(...)` and call SDK methods.

2. Command-local flow (only when needed)
- Extend `Command` directly.
- Use local helpers for specialized flows (for example trigger + poll log streaming).

## Output contract guidance

Define output contract before implementation:

- What prints to stdout on success?
- What exact failures should be actionable for users?
- Is output machine-readable (JSON) or operator-readable (logs)?

Treat output contract as API. If it changes, update tests and docs in the same change.

## Minimal command template

```ts
import { Flags } from "@oclif/core";
import { BaseCommand } from "../../base-command.js";

export default class ExampleList extends BaseCommand {
  static summary = "Example list";

  static flags = {
    ...BaseCommand.baseFlags,
    limit: Flags.integer({ default: 50 }),
  };

  public async run() {
    const { flags } = await this.parse(ExampleList);
    const client = this.createSdkClient({
      "base-url": flags["base-url"],
      "auth-token": flags["auth-token"],
    });

    const result = await client.projects.listPromise({ limit: flags.limit });
    this.log(JSON.stringify(result, null, 2));
    return result;
  }
}
```
