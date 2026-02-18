import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";

// eslint-disable-next-line turbo/no-undeclared-env-vars
process.env.NODE_ENV = "production";

import SayHello, { buildHelloMessage } from "../../src/commands/say-hello.js";

const captureStdout = async <T>(task: () => Promise<T>) => {
	const chunks: Array<string> = [];
	const writeSpy = vi
		.spyOn(process.stdout, "write")
		.mockImplementation(((chunk: string | Uint8Array) => {
			chunks.push(
				typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"),
			);
			return true;
		}) as typeof process.stdout.write);

	try {
		const result = await task();
		return { result, stdout: chunks.join("") };
	} finally {
		writeSpy.mockRestore();
	}
};

describe("say-hello command", () => {
	it("builds the greeting message with Effect", async () => {
		const message = await Effect.runPromise(buildHelloMessage("Codex"));
		expect(message).toBe("Hello, Codex!");
	});

	it("prints the default greeting", async () => {
		const { result, stdout } = await captureStdout(() => SayHello.run([]));

		expect(result).toEqual({ message: "Hello, World!", name: "World" });
		expect(stdout).toContain("Hello, World!");
	});

	it("supports --name and --json", async () => {
		const { result, stdout } = await captureStdout(() =>
			SayHello.run(["--name", "Marcos", "--json"]),
		);

		expect(result).toEqual({ message: "Hello, Marcos!", name: "Marcos" });
		expect(stdout).toContain('"message": "Hello, Marcos!"');
	});

	it("fails on unknown flags via oclif parsing", async () => {
		await expect(SayHello.run(["--nope"])).rejects.toThrow();
	});
});
