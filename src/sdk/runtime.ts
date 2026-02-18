import type { CreateClientOptions } from "./types.js";

export type ClientRuntime = {
	readonly baseUrl: string;
	readonly authToken: string;
	readonly transport: NonNullable<CreateClientOptions["transport"]>;
};
