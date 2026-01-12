export type WorkflowRoute = Promise<
	NextResponse<{
		runId: string;
	}>
>;

NextResponse.json()
