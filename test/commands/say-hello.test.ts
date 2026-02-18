import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import {
	parseSayHelloArgs,
	runSayHello,
} from "../../src/commands/say-hello.js";
import type { CliIo } from "../../src/io.js";

const createMockIo = () => {
	const stdout: Array<string> = [];
	const stderr: Array<string> = [];

	const io: CliIo = {
		stdout: (message) => Effect.sync(() => stdout.push(message)),
		stderr: (message) => Effect.sync(() => stderr.push(message)),
	};

	return { io, stdout, stderr };
};

describe("parseSayHelloArgs", () => {
	it("parses the default invocation", () => {
		const result = parseSayHelloArgs([]);
		expect(result).toEqual({ ok: true, value: { help: false, name: "World" } });
	});

	it("parses custom names from short and long flags", () => {
		const long = parseSayHelloArgs(["--name", "Marcos"]);
		const short = parseSayHelloArgs(["-n", "Essindi"]);

		expect(long.ok && long.value.name).toBe("Marcos");
		expect(short.ok && short.value.name).toBe("Essindi");
	});
});

describe("runSayHello", () => {
	it("writes the default greeting", async () => {
		const { io, stdout, stderr } = createMockIo();

		const exitCode = await Effect.runPromise(runSayHello([], io));

		expect(exitCode).toBe(0);
		expect(stdout).toEqual(["Hello, World!"]);
		expect(stderr).toEqual([]);
	});

	it("writes usage on parse errors", async () => {
		const { io, stdout, stderr } = createMockIo();

		const exitCode = await Effect.runPromise(runSayHello(["--name"], io));

		expect(exitCode).toBe(1);
		expect(stdout).toEqual([]);
		expect(stderr[0]).toContain("Missing value for --name");
		expect(stderr.join("\n")).toContain("Usage: control-plane say-hello");
	});
});
