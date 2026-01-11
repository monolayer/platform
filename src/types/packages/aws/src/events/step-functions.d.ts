export type StepFunctionsExecutionStatusChangeEvent = {
    "detail-type": "Step Functions Execution Status Change";
    source: "aws.states";
    detail: {
        executionArn: string;
        input: string;
        inputDetails: {
            included: boolean;
        };
        name: string;
        output: string;
        outputDetails: {
            included: string;
        };
        startDate: number;
        stateMachineArn: string;
        stopDate: number;
        status: "RUNNING" | "SUCCEEDED" | "FAILED" | "TIMED_OUT" | "ABORTED" | "PENDING_REDRIVE";
    };
};
