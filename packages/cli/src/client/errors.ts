import { Data } from "effect";

export class AuthError extends Data.TaggedError("AuthError")<{
	readonly message: string;
}> {}

export class ConfigError extends Data.TaggedError("ConfigError")<{
	readonly message: string;
}> {}

export class ValidationError extends Data.TaggedError("ValidationError")<{
	readonly message: string;
}> {}

export class NotFoundError extends Data.TaggedError("NotFoundError")<{
	readonly message: string;
	readonly statusCode?: number;
}> {}

export class RateLimitError extends Data.TaggedError("RateLimitError")<{
	readonly message: string;
	readonly statusCode?: number;
}> {}

export class ApiError extends Data.TaggedError("ApiError")<{
	readonly message: string;
	readonly statusCode?: number;
	readonly requestId?: string;
}> {}

export class TransportError extends Data.TaggedError("TransportError")<{
	readonly message: string;
}> {}

export type ClientError =
	| AuthError
	| ConfigError
	| ValidationError
	| NotFoundError
	| RateLimitError
	| ApiError
	| TransportError;
