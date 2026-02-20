import { expect, test } from "vitest";
import { Workload } from "~/workloads/workload.js";
import { Task } from "./task.js";

test("task is a Workload", () => {
	expect(Task.prototype).toBeInstanceOf(Workload);
});

test("task id is kebab case of name", () => {
	const testTask = new Task("Send emails", async () => {}, {});
	expect(testTask.id).toStrictEqual("send-emails");
});

test("task work", async () => {
	let work: Record<string, string> = {};
	const testTask = new Task<{ name: string }>(
		"Test",
		async ({ taskId, data }) => {
			work = {
				taskId,
				...data,
			};
		},
		{},
	);
	await testTask.work({ taskId: "fakeid", data: { name: "Tom" } });
	expect(work).toStrictEqual({ taskId: "fakeid", name: "Tom" });
});
