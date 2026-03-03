import { afterEach, describe, expect, it, vi } from "vitest";

import { Effect, Either } from "effect";
import { createClient } from "../../src/sdk/client.js";
import { AuthError, NotFoundError } from "../../src/sdk/errors.js";
import { createMockTransport } from "../../src/sdk/mock-transport.js";

describe("createClient", () => {
	// oxlint-disable-next-line turbo/no-undeclared-env-vars
	const originalToken = process.env.MONOLAYER_AUTH_TOKEN;

	afterEach(() => {
		vi.unstubAllGlobals();

		if (originalToken) {
			// oxlint-disable-next-line turbo/no-undeclared-env-vars
			process.env.MONOLAYER_AUTH_TOKEN = originalToken;
			return;
		}
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		delete process.env.MONOLAYER_AUTH_TOKEN;
	});

	const createMockClient = () =>
		createClient({
			baseUrl: "https://api.monolayer.com",
			authToken: "test-token",
			transport: createMockTransport(),
		});

	it("builds a client with normalized config", () => {
		const client = createClient({
			baseUrl: "https://api.monolayer.com/v1",
			authToken: "test-token",
		});

		expect(client.config.baseUrl).toBe("https://api.monolayer.com");
	});

	it("fails fast when auth token is not provided", () => {
		// oxlint-disable-next-line turbo/no-undeclared-env-vars
		delete process.env.MONOLAYER_AUTH_TOKEN;
		expect(() =>
			createClient({
				baseUrl: "https://api.monolayer.com",
			}),
		).toThrow(AuthError);
	});

	it("uses http transport by default", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			new Response(
				JSON.stringify({
					items: [{ projectId: "proj-9", name: "Platform SDK" }],
				}),
				{
					status: 200,
					headers: {
						"content-type": "application/json",
					},
				},
			),
		);
		vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

		const client = createClient({
			baseUrl: "https://api.monolayer.com",
			authToken: "test-token",
		});

		const projects = await client.projects.listPromise();

		expect(projects.items[0]?.projectId).toBe("proj-9");
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [requestUrl, requestInit] = fetchMock.mock.calls[0] as [URL, RequestInit];
		expect(requestUrl.toString()).toBe("https://api.monolayer.com/v1/projects");
		expect(requestInit.method).toBe("GET");
		expect(requestInit.headers).toMatchObject({
			authorization: "Bearer test-token",
		});
	});

	it("lists projects from mock transport", async () => {
		const client = createMockClient();

		const projects = await client.projects.listPromise();
		expect(projects.items.length).toBeGreaterThan(0);
		expect(projects.items[0]?.projectId).toBe("proj-1");
	});

	it("supports cursor pagination and filtering for deployment lists", async () => {
		const client = createMockClient();

		const firstPage = await client.deployments.listPromise({ limit: 1 });
		expect(firstPage.items).toHaveLength(1);
		expect(firstPage.nextCursor).toBeDefined();

		const secondPage = await client.deployments.listPromise({
			cursor: firstPage.nextCursor,
			limit: 1,
		});
		expect(secondPage.items).toHaveLength(1);

		const filtered = await client.deployments.listPromise({
			projectId: "proj-1",
		});
		expect(filtered.items.every((item) => item.projectId === "proj-1")).toBe(
			true,
		);
	});

	it("creates and retrieves deployments from mock transport", async () => {
		const client = createMockClient();

		const created = await client.deployments.createPromise({
			projectId: "proj-2",
			environmentId: "prod",
			sourceRef: "main",
		});

		const fetched = await client.deployments.getPromise({
			projectId: created.projectId,
			deploymentId: created.deploymentId,
		});

		expect(fetched.deploymentId).toBe(created.deploymentId);
		expect(fetched.projectId).toBe("proj-2");
	});

	it("returns typed not-found error for missing deployment", async () => {
		const client = createMockClient();

		const result = await Effect.runPromise(
			Effect.either(
				client.deployments.get({
					projectId: "proj-1",
					deploymentId: "dep-missing",
				}),
			),
		);

		expect(Either.isLeft(result)).toBe(true);
		if (Either.isLeft(result)) {
			expect(result.left).toBeInstanceOf(NotFoundError);
		}
	});

	it("sets and lists secret metadata without exposing values", async () => {
		const client = createMockClient();

		const updatedSecret = await client.secrets.setPromise({
			projectId: "proj-1",
			key: "DATABASE_URL",
			value: "postgres://new-connection-string",
		});

		expect(updatedSecret.key).toBe("DATABASE_URL");
		expect(updatedSecret.version).toBeGreaterThanOrEqual(1);
		expect(updatedSecret).not.toHaveProperty("value");

		const list = await client.secrets.listPromise({
			projectId: "proj-1",
			limit: 10,
		});
		expect(list.items.some((item) => item.key === "DATABASE_URL")).toBe(true);
		expect(list.items[0]).not.toHaveProperty("value");
	});
});
