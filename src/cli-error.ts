import { Data } from "effect";

export class CliUsageError extends Data.TaggedError("CliUsageError")<{
	readonly message: string;
}> {}
