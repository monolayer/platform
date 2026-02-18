import type { PerformOptions, Task } from "~/workloads/stateless/task/task.js";

import { dispatcher } from "~/workloads/stateless/task/dispatcher.js";

export async function performLater<P>(
	task: Task<P>,
	data: P | P[],
	options?: PerformOptions,
) {
	return await (
		await dispatcher()
	)(task, data, options);
}
