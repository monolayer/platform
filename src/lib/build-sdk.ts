import { setTimeout } from "timers/promises";
import { invokeWorkflow } from "./invoke.js";
import { workflowRun } from "./status.js";

export function buildSDK<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Workflows extends Record<string, (...args: any[]) => Promise<any>>,
>(paths: Record<keyof Workflows, string>) {
	const wfns: Workflows = {} as Workflows;
	for (const path of Object.keys(paths)) {
		// @ts-expect-error generic only reads
		wfns[path] = async function (
			...args: Parameters<Workflows[typeof path]>
		): Promise<ReturnType<Workflows[typeof path]>> {
			const invokedRun = await invokeWorkflow({
				workflowId: `workflow//${paths[path]}//${path}`,
				input: args,
			});
			let run: Awaited<ReturnType<typeof workflowRun>>;
			do {
				run = await workflowRun(invokedRun.runId);
				switch (run.status) {
					case "failed":
					case "cancelled":
						throw new Error("Workflow failed");
					case "pending":
					case "running":
						await setTimeout(1000);
						break;
					default:
						break;
				}
			} while (run.status !== "completed");
			return run.result;
		};
	}
	return wfns;
}
