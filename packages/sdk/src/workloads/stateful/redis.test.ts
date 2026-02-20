import { expect } from "vitest";
import { Redis } from "~/workloads/stateful/redis.js";
import { StatefulWorkloadWithClient } from "~/workloads/stateful/stateful-workload.js";
import { test } from "~test/__setup__/container-test.js";

test("Redis is a StatefulWorkloadWithClient", () => {
	expect(Redis.prototype).toBeInstanceOf(StatefulWorkloadWithClient);
});

test("connStringComponents", async () => {
	const redis = new Redis("products");
	expect(redis.connStringComponents).toStrictEqual(["redis", "products"]);
});
