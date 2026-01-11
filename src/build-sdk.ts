import { type hello as helloWorkflow } from "@control-plane/workflows/draft";
import { type handleUserSignup as handleUserSignupWorkflow } from "@control-plane/workflows/user-signup";
import { start, type Run } from "workflow/api";

type Workflows = {
	handleSignUp: typeof handleUserSignupWorkflow;
	hello: typeof helloWorkflow;
};

const WorkflowPaths: Record<keyof Workflows, string> = {
	handleSignUp: "src/workflows/user-signup.ts",
	hello: "src/workflows/draft.ts",
};

export async function sdkStart<W extends keyof Workflows>(
	workflow: W,
	args: Parameters<Workflows[W]>,
) {
	const workflowToStart = {
		workflowId: `workflow//${WorkflowPaths[workflow]}//${workflow}`,
	};
	// Example: workflow//src/workflows/user-signup.ts//handleUserSignup

	return (await start(workflowToStart, args)) as ReturnType<Workflows[W]>;
}

export function buildSDK<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Workflows extends Record<string, (...args: any[]) => Promise<any>>,
>(paths: Record<keyof Workflows, string>) {
	return async <W extends keyof Workflows & string>(
		workflow: W,
		...args: Parameters<Workflows[W]>
	) => {
		const workflowToStart = {
			workflowId: `workflow//${paths[workflow]}//${workflow}`,
		};
		return (await start(workflowToStart, args)) as Run<
			Awaited<ReturnType<Workflows[W]>>
		>;
	};
}
