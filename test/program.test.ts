import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import type { CliIo } from "../src/io.js";
import { runCli } from "../src/program.js";

const createMockIo = () => {
	const stdout: Array<string> = [];
	const stderr: Array<string> = [];

	const io: CliIo = {
		stdout: (message) => Effect.sync(() => stdout.push(message)),
		stderr: (message) => Effect.sync(() => stderr.push(message)),
	};

	return { io, stdout, stderr };
};

describe("runCli", () => {
	it("prints root help when no command is provided", async () => {
		const { io, stdout, stderr } = createMockIo();

		const exitCode = await Effect.runPromise(runCli([], io));

		expect(exitCode).toBe(0);
		expect(stdout.join("\n")).toContain("Usage: control-plane <command> [options]");
		expect(stderr).toEqual([]);
	});

	it("dispatches to say-hello", async () => {
		const { io, stdout, stderr } = createMockIo();

		const exitCode = await Effect.runPromise(runCli(["say-hello", "--name", "Codex"], io));

		expect(exitCode).toBe(0);
		expect(stdout).toEqual(["Hello, Codex!"]);
		expect(stderr).toEqual([]);
	});

	it("returns an error for unknown commands", async () => {
		const { io, stdout, stderr } = createMockIo();

		const exitCode = await Effect.runPromise(runCli(["not-a-command"], io));

		expect(exitCode).toBe(1);
		expect(stdout).toEqual([]);
		expect(stderr[0]).toContain("Unknown command: not-a-command");
	});
});
