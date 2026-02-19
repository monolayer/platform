# Adding Commands

## Command checklist

1. Create a file in `src/commands/<topic>/<action>.ts` (e.g., `src/commands/workloads/add/bucket.ts`).
2. Export a default class that extends `Command` from `@oclif/core`.
3. Define:
   - `summary`
   - `description`
   - `examples`
   - `flags` / `args`
4. Keep `run()` orchestration-focused.
5. Return structured result when JSON output should be supported.
6. Add Vitest coverage in `test/commands/<topic>/<action>.test.ts`.

## Template

```ts
import { Command, Flags } from "@oclif/core";
import { Effect } from "effect";

const doWork = (input: string) => Effect.succeed({ value: input });

export default class Example extends Command {
	static summary = "Example command";
	static enableJsonFlag = true;

	static flags = {
		input: Flags.string({ required: true }),
	};

	public async run() {
		const { flags } = await this.parse(Example);
		const result = await Effect.runPromise(doWork(flags.input));
		if (flags.json) return result;
		this.log(result.value);
		return result;
	}
}
```

## Naming conventions

- Use directory structure for topics and actions:
  - `src/commands/workloads/add/bucket.ts` -> `workloads add bucket`
  - `src/commands/local/start/dev.ts` -> `local start dev`
- Keep alias list short and explicit (`aliases = ["alias"]`).
- Prefer `summary` for command listings and `description` for detailed help.

## Output conventions

- Human mode: concise, one-line success where possible.
- JSON mode (`--json`): return typed object with stable keys.
- Errors: let Oclif handle parsing/usage errors, throw structured errors for domain failures.
