import * as devalue from "devalue";
import { Effect } from "effect";
import z from "zod";
import { httpFetch } from "./fetch-effect.js";

export interface Run {
	runId: string;
}

const invokeWorkflowResponseSchema = z
	.object({
		runId: z.string(),
	})
	.transform((d) => d as Run);

export async function invokeWorkflow(opts: {
	workflowId: string;
	input: unknown;
}) {
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	const url = `${process.env.WORKFLOW_APP_HOST}/api/workflow`;
	const response = await Effect.runPromise(
		httpFetch(url, {
			method: "POST",
			body: devalue.stringify(opts),
		}),
	);
	const json = await response.json();
	return invokeWorkflowResponseSchema.parse(json);
}
