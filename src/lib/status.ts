import { Effect } from "effect";
import z from "zod";
import { httpFetch } from "./fetch-effect.js";

export async function workflowRun(runId: string) {
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	const url = `${process.env.WORKFLOW_APP_HOST}/api/workflow/${runId}`;
	const response = await Effect.runPromise(httpFetch(url));
	const json = await response.json();
	return workflowRunSchema.parse(json);
}

const runResultSchema = z.object({
	status: z.literal("completed"),
	result: z.any(),
});

export type RunResultSchema = z.infer<typeof runResultSchema>;

const runStatusSchema = z.object({
	status: z.enum(["pending", "running", "failed", "cancelled"]),
});

export type RunStatusSchema = z.infer<typeof runStatusSchema>;

export const workflowRunSchema = z.discriminatedUnion("status", [
	runStatusSchema,
	runResultSchema,
]);
