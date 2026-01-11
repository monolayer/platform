import { start, type Run } from "workflow/api";

export function buildSDK<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Workflows extends Record<string, (...args: any[]) => Promise<any>>,
>(paths: Record<keyof Workflows, string>) {
	const startRun = async <W extends keyof Workflows & string>(
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
	const wfns: Workflows = {} as Workflows;
	for (const path of Object.keys(paths)) {
		// @ts-expect-error generic only reads
		wfns[path] = async (...args: Parameters<Workflows[typeof path]>) => {
			const run = await startRun(path, ...args);
			return await run.returnValue;
		};
	}
	return wfns;
}
