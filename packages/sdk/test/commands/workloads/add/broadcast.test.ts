import { execSync } from "child_process";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AddBroadcast from "../../../../src/commands/workloads/add/broadcast.js";

vi.mock("child_process");

describe("add broadcast command", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("runs shadcn add broadcast", async () => {
		await AddBroadcast.run([]);

		expect(execSync).toHaveBeenCalledWith(
			expect.stringContaining("npx shadcn@latest add"),
			expect.anything(),
		);
	});
});
