import { Effect } from "effect";

import { TransportError } from "./errors.js";
import type { Transport } from "./transport.js";

export const createMockTransport = (): Transport =>
	() =>
		Effect.fail(
			new TransportError({
				message: "Mock transport endpoints are not implemented yet",
			}),
		);
