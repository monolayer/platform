import { Effect } from "effect";

import { CliUsageError } from "../cli-error.js";
import type { CliIo } from "../io.js";

export const sayHelloUsage = [
	"Usage: control-plane say-hello [options]",
	"",
	"Options:",
	"  -n, --name <name>   Name to greet (default: World)",
	"  -h, --help          Show help",
].join("\n");

type SayHelloParseResult = {
	readonly help: boolean;
	readonly name: string;
};

type SayHelloParseFailure = {
	readonly ok: false;
	readonly error: CliUsageError;
};

type SayHelloParseSuccess = {
	readonly ok: true;
	readonly value: SayHelloParseResult;
};

type SayHelloParseOutcome = SayHelloParseFailure | SayHelloParseSuccess;

export const parseSayHelloArgs = (
	args: ReadonlyArray<string>,
): SayHelloParseOutcome => {
	let name = "World";
	let help = false;

	for (let index = 0; index < args.length; index += 1) {
		const argument = args[index];
		if (!argument) {
			continue;
		}

		if (argument === "--help" || argument === "-h") {
			help = true;
			continue;
		}

		if (argument === "--name" || argument === "-n") {
			const candidate = args[index + 1];
			if (!candidate || candidate.startsWith("-")) {
				return {
					ok: false,
					error: new CliUsageError({
						message: `Missing value for ${argument}`,
					}),
				};
			}
			name = candidate;
			index += 1;
			continue;
		}

		if (argument.startsWith("-")) {
			return {
				ok: false,
				error: new CliUsageError({
					message: `Unknown option: ${argument}`,
				}),
			};
		}

		return {
			ok: false,
			error: new CliUsageError({
				message: `Unexpected argument: ${argument}`,
			}),
		};
	}

	return { ok: true, value: { help, name } };
};

export const runSayHello = (
	args: ReadonlyArray<string>,
	io: CliIo,
): Effect.Effect<number> =>
	Effect.gen(function* () {
		const parsed = parseSayHelloArgs(args);

		if (!parsed.ok) {
			yield* io.stderr(parsed.error.message);
			yield* io.stderr("");
			yield* io.stderr(sayHelloUsage);
			return 1;
		}

		if (parsed.value.help) {
			yield* io.stdout(sayHelloUsage);
			return 0;
		}

		yield* io.stdout(`Hello, ${parsed.value.name}!`);
		return 0;
	});
