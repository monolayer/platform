import { z } from "zod/v3";
export declare const progressStates: readonly ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
export type ProgressState = "PENDING" | "IN_PROGRESS" | "CANCEL_IN_PROGRESS" | "CANCEL_COMPLETE" | "FAILED" | "SUCCESS";
export declare const progressDynamoDBSchema: import("dynamodb-toolbox").StringSchema_<{
    enum: ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
}>;
export declare const progressZodSchema: z.ZodEnum<["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"]>;
export declare const deploymentProgressStates: readonly ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
export type DeploymentProgressState = "PENDING" | "IN_PROGRESS" | "IMAGE_BUILD" | "EDGE_AND_LB_PROVISION" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "STATEFUL_WORKLOADS_DELETE" | "CANCEL_IN_PROGRESS" | "CANCEL_COMPLETE" | "FAILED" | "SUCCESS";
export declare const deyploymentProgressDynamoDBSchema: import("dynamodb-toolbox").StringSchema_<{
    enum: ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
}>;
export declare const deyploymentProgressZodSchema: z.ZodEnum<["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"]>;
