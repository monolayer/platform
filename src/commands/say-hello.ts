import { Command, Flags } from "@oclif/core";
import { Effect } from "effect";

export type SayHelloResult = {
	readonly message: string;
	readonly name: string;
};

export const buildHelloMessage = (name: string): Effect.Effect<string> =>
	Effect.succeed(`Hello, ${name}!`);

export default class SayHello extends Command {
	static summary = "Print a friendly greeting";

	static description =
		"Sample command that greets a user by name. This command demonstrates Oclif flags and help generation.";

	static aliases = ["hello"];

	static enableJsonFlag = true;

	static examples = [
		"<%= config.bin %> <%= command.id %>",
		"<%= config.bin %> <%= command.id %> --name Marcos",
		"<%= config.bin %> <%= command.id %> --json",
	];

	static flags = {
		name: Flags.string({
			char: "n",
			default: "World",
			summary: "Name to greet",
		}),
	};

	public async run(): Promise<SayHelloResult> {
		const { flags } = await this.parse(SayHello);
		const message = await Effect.runPromise(buildHelloMessage(flags.name));
		const result = { message, name: flags.name };

		if (flags.json) {
			return result;
		}

		this.log(message);
		return result;
	}
}
