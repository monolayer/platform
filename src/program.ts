import { Effect } from "effect";

import { runSayHello } from "./commands/say-hello.js";
import { defaultCliIo, type CliIo } from "./io.js";

export const rootUsage = [
	"control-plane",
	"",
	"Usage: control-plane <command> [options]",
	"",
	"Commands:",
	"  say-hello    Print a greeting message",
	"",
	"Global options:",
	"  -h, --help   Show this help",
].join("\n");

export const runCli = (
	argv: ReadonlyArray<string>,
	io: CliIo = defaultCliIo,
): Effect.Effect<number> =>
	Effect.gen(function* () {
		const [firstArg, ...rest] = argv;

		if (!firstArg || firstArg === "--help" || firstArg === "-h") {
			yield* io.stdout(rootUsage);
			return 0;
		}

		switch (firstArg) {
			case "say-hello":
				return yield* runSayHello(rest, io);
			default:
				yield* io.stderr(`Unknown command: ${firstArg}`);
				yield* io.stderr("");
				yield* io.stderr(rootUsage);
				return 1;
		}
	});

export { defaultCliIo, type CliIo };
