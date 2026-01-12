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

		const result = await Effect.runPromise(
			httpFetch("https://example.com", { retries: 3 }),
		);
		expect(result).toBe(mockResponse);
	});

	it("should fail on forbidden", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(new Response("forbidden", { status: 403 }));
		global.fetch = fetchMock;

		await expect(
			Effect.runPromise(httpFetch("https://example.com", { retries: 3 })),
		).rejects.toThrow("Unsuccessful response");
	});

	it("should fail after exhausting retries", async () => {
		const fetchMock = vi.fn().mockRejectedValue(new Error("Network Error"));
		global.fetch = fetchMock;

		const program = httpFetch("https://example.com", { retries: 2 });

		await expect(Effect.runPromise(program)).rejects.toThrow(
			"Something went wrong",
		);
	});

	it("should NOT retry on AbortError", async () => {
		const abortError = new DOMException("Aborted", "AbortError");
		const fetchMock = vi.fn().mockRejectedValue(abortError);
		global.fetch = fetchMock;

		const program = httpFetch("https://example.com", { retries: 3 });

		await expect(Effect.runPromise(program)).rejects.toThrow("Aborted");
	});
});
