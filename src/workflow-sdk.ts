import { type hello as helloWorkflow } from "@control-plane/workflows/draft";
import { type handleUserSignup as handleUserSignupWorkflow } from "@control-plane/workflows/user-signup";
import { buildSDK } from "./build-sdk";

type Workflows = {
	handleSignUp: typeof handleUserSignupWorkflow;
	hello: typeof helloWorkflow;
};

const WorkflowPaths: Record<keyof Workflows, string> = {
	handleSignUp: "src/workflows/user-signup.ts",
	hello: "src/workflows/draft.ts",
};

const workflowSDK = buildSDK<Workflows>(WorkflowPaths);

export async function handleUserSignup(
	...args: Parameters<typeof handleUserSignupWorkflow>
) {
	const run = await workflowSDK("handleSignUp", ...args);
	return await run.returnValue;
}

export async function hello(...args: Parameters<typeof helloWorkflow>) {
	const run = await workflowSDK("hello", ...args);
	return await run.returnValue;
}
