import { Effect } from "effect";

import type { TransportError } from "./errors.js";

export type HttpMethod = "GET" | "POST" | "PUT";

export type HttpRequest = {
	readonly method: HttpMethod;
	readonly path: string;
	readonly query?: Record<string, string | number | boolean | undefined>;
	readonly body?: unknown;
	readonly headers?: Record<string, string | undefined>;
};

export type HttpResponse = {
	readonly status: number;
	readonly body: unknown;
	readonly headers?: Record<string, string | undefined>;
};

export type Transport = (
	request: HttpRequest,
) => Effect.Effect<HttpResponse, TransportError>;
