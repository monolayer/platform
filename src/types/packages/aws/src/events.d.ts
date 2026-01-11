import type { ProgressState } from "../../db/src/progress";
import type { EventBridgeEvent, StreamRecord } from "aws-lambda";
export type EventStatusProgress = Extract<ProgressState, "PENDING" | "IN_PROGRESS" | "FAILED" | "SUCCESS">;
export type MonolayerDynamoDbStreamEvent = {
    "detail-type": "DynamoDB Stream";
    detail: {
        eventName: string;
        dynamodb: StreamRecord;
    };
};
export type DeploymentFinishEvent = EventBridgeEvent<"Deployment Finish", {
    projectId: string;
    project: string;
    environment: string;
    deploymentNumber: string;
}>;
import { z } from "zod/v3";
export declare const environmentStatusChangeEventDetail: z.ZodObject<{
    projectId: z.ZodString;
    projectName: z.ZodString;
    environmentName: z.ZodString;
    deploymentNumber: z.ZodOptional<z.ZodString>;
    previousDeploymentNumber: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["CREATING", "CREATED", "CREATE_FAILED", "DELETING", "DELETED", "DELETE_FAILED", "UPDATING", "UPDATED", "UPDATE_FAILED", "DEPLOYING", "DEPLOYED", "DEPLOY_FAILED"]>;
}, "strip", z.ZodTypeAny, {
    projectId: string;
    projectName: string;
    environmentName: string;
    deploymentNumber?: string | undefined;
    previousDeploymentNumber?: string | undefined;
    status: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING";
}, {
    projectId: string;
    projectName: string;
    environmentName: string;
    deploymentNumber?: string | undefined;
    previousDeploymentNumber?: string | undefined;
    status: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING";
}>;
export declare const environmentStatusChangeEvent: z.ZodObject<{
    source: z.ZodLiteral<"monolayer.cloud">;
    "detail-type": z.ZodLiteral<"Environment Status Change">;
    detail: z.ZodObject<{
        projectId: z.ZodString;
        projectName: z.ZodString;
        environmentName: z.ZodString;
        deploymentNumber: z.ZodOptional<z.ZodString>;
        previousDeploymentNumber: z.ZodOptional<z.ZodString>;
        status: z.ZodEnum<["CREATING", "CREATED", "CREATE_FAILED", "DELETING", "DELETED", "DELETE_FAILED", "UPDATING", "UPDATED", "UPDATE_FAILED", "DEPLOYING", "DEPLOYED", "DEPLOY_FAILED"]>;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        projectName: string;
        environmentName: string;
        deploymentNumber?: string | undefined;
        previousDeploymentNumber?: string | undefined;
        status: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING";
    }, {
        projectId: string;
        projectName: string;
        environmentName: string;
        deploymentNumber?: string | undefined;
        previousDeploymentNumber?: string | undefined;
        status: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING";
    }>;
}, "strip", z.ZodTypeAny, {
    source: "monolayer.cloud";
    "detail-type": "Environment Status Change";
    detail: {
        projectId: string;
        projectName: string;
        environmentName: string;
        deploymentNumber?: string | undefined;
        previousDeploymentNumber?: string | undefined;
        status: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING";
    };
}, {
    source: "monolayer.cloud";
    "detail-type": "Environment Status Change";
    detail: {
        projectId: string;
        projectName: string;
        environmentName: string;
        deploymentNumber?: string | undefined;
        previousDeploymentNumber?: string | undefined;
        status: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING";
    };
}>;
export declare function buildEnvironmentStatusChangeEvent(opts: {
    projectId: string;
    environmentName: string;
    previousDeploymentNumber: string;
    projectName: string;
    status: z.output<typeof environmentStatusChangeEvent>["detail"]["status"];
}): z.output<typeof environmentStatusChangeEvent>;
export * from "./events/cloudformation";
export * from "./events/code-build";
export * from "./events/ecs";
export * from "./events/ssm";
export * from "./events/step-functions";
