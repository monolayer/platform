import { Effect } from "effect";

import { TransportError } from "./errors.js";
import type { HttpRequest, HttpResponse, Transport } from "./transport.js";

const responseHeaders = (
	headers: Headers,
): Record<string, string | undefined> => {
	const result: Record<string, string | undefined> = {};
	for (const [key, value] of headers.entries()) {
		result[key.toLowerCase()] = value;
	}
	return result;
};

const responseBody = async (response: Response): Promise<unknown> => {
	const raw = await response.text();
	if (raw.length === 0) {
		return null;
	}

	const contentType = response.headers.get("content-type") ?? "";
	if (contentType.includes("application/json")) {
		try {
			return JSON.parse(raw);
		} catch {
			return {
				message: raw,
			};
		}
	}

	try {
		return JSON.parse(raw);
	} catch {
		return raw;
	}
};

const requestUrl = (baseUrl: string, request: HttpRequest): URL => {
	const url = new URL(request.path, baseUrl);

	for (const [key, value] of Object.entries(request.query ?? {})) {
		if (value !== undefined) {
			url.searchParams.set(key, String(value));
		}
	}

	return url;
};

const requestHeaders = (request: HttpRequest): Record<string, string> => {
	const headers: Record<string, string> = {};
	let hasContentType = false;

	for (const [key, value] of Object.entries(request.headers ?? {})) {
		if (value !== undefined) {
			headers[key] = value;
			if (key.toLowerCase() === "content-type") {
				hasContentType = true;
			}
		}
	}

	if (request.body !== undefined && !hasContentType) {
		headers["content-type"] = "application/json";
	}

	return headers;
};

export const createHttpTransport = (baseUrl: string): Transport => {
	return (request) =>
		Effect.tryPromise({
			try: async () => {
				const url = requestUrl(baseUrl, request);
				const headers = requestHeaders(request);
				const response = await fetch(url, {
					method: request.method,
					headers,
					body:
						request.body === undefined ? undefined : JSON.stringify(request.body),
				});

				return {
					status: response.status,
					body: await responseBody(response),
					headers: responseHeaders(response.headers),
				} satisfies HttpResponse;
			},
			catch: (error) =>
				new TransportError({
					message:
						error instanceof Error
							? `Request failed for ${request.method} ${request.path}: ${error.message}`
							: `Request failed for ${request.method} ${request.path}`,
				}),
		});
};
