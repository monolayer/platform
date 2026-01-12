import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { httpFetch } from "./fetch-effect.js";

describe("httpFetch (Effect)", () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		vi.restoreAllMocks();
		global.fetch = originalFetch;
	});

	it("should succeed on first attempt", async () => {
		const mockResponse = new Response("ok", { status: 200 });
		const fetchMock = vi.fn().mockResolvedValue(mockResponse);
		global.fetch = fetchMock;

		const result = await Effect.runPromise(httpFetch("https://example.com"));

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(result).toBe(mockResponse);
	});

	it("should retry on failure and eventually succeed", async () => {
		const mockResponse = new Response("ok", { status: 200 });
		const fetchMock = vi
			.fn()
			.mockRejectedValueOnce(new Error("Network Error"))
			.mockRejectedValueOnce(new Error("Network Error"))
			.mockResolvedValue(mockResponse);
		global.fetch = fetchMock;

		// We can use TestServices or just run it.
		// Since there is a delay ("300 millis" exponential), running it for real might be slow.
		// However, for 2 retries it's manageable (300ms + 600ms ~= 1s).
		// To optimize, we could mock the Scheduler, but let's stick to real time for simplicity unless it's too slow.
		// Or we can use `TestContext` if available, but I'll stick to basic execution first.

		const result = await Effect.runPromise(
			httpFetch("https://example.com", { retries: 3 }),
		);

		expect(fetchMock).toHaveBeenCalledTimes(3);
		expect(result).toBe(mockResponse);
	});

	it("should fail after exhausting retries", async () => {
		const fetchMock = vi.fn().mockRejectedValue(new Error("Network Error"));
		global.fetch = fetchMock;

		const program = httpFetch("https://example.com", { retries: 2 });

		await expect(Effect.runPromise(program)).rejects.toThrow();
		expect(fetchMock).toHaveBeenCalledTimes(3); // Initial + 2 retries
	});

	it("should NOT retry on AbortError", async () => {
		const abortError = new DOMException("Aborted", "AbortError");
		const fetchMock = vi.fn().mockRejectedValue(abortError);
		global.fetch = fetchMock;

		const program = httpFetch("https://example.com", { retries: 3 });

		// Use runPromiseExit to get the full exit details
		const exit = await Effect.runPromiseExit(program);

		expect(exit._tag).toBe("Failure");
		if (exit._tag === "Failure") {
			// The logic in fetch-effect.ts stops retrying if it matches the predicate.
			// So if it stopped, it returns the failure underlying.

			// Let's just check calls count first
			expect(fetchMock).toHaveBeenCalledTimes(1);
		}
	});
});
