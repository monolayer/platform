import { setTimeout } from "timers/promises";

export function fetch(): Promise<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| { result: any; status: "completed" }
	| { status: "pending" | "running" | "failed" | "cancelled" }
> {
	return new Promise((resolve) =>
		resolve({
			result: "hello",
			status: "completed",
		}),
	);
}

export async function poll() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let result: { result: any; status: "completed" } | undefined = undefined;

	const interval = 1000;
	let done = false;

	do {
		const fetched = await fetch();
		if (fetched.status === "completed") {
			done = true;
			result = fetched.result;
		}
		if (!done) await setTimeout(interval);
	} while (done === false);

	return result as { result: any; status: "completed" };
}
