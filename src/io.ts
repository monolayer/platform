import { Effect } from "effect";

export interface CliIo {
	readonly stdout: (message: string) => Effect.Effect<void>;
	readonly stderr: (message: string) => Effect.Effect<void>;
}

export const defaultCliIo: CliIo = {
	stdout: (message) => Effect.sync(() => console.log(message)),
	stderr: (message) => Effect.sync(() => console.error(message)),
};
