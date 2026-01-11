import { z } from "zod/v3";
export type CloudFormationStackStatusChangeEventStatus = "CREATE_IN_PROGRESS" | "CREATE_FAILED" | "CREATE_COMPLETE" | "ROLLBACK_IN_PROGRESS" | "ROLLBACK_FAILED" | "ROLLBACK_COMPLETE" | "DELETE_IN_PROGRESS" | "DELETE_FAILED" | "DELETE_COMPLETE" | "UPDATE_IN_PROGRESS" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "REVIEW_IN_PROGRESS" | "IMPORT_IN_PROGRESS" | "IMPORT_COMPLETE" | "IMPORT_ROLLBACK_IN_PROGRESS" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_COMPLETE";
export interface CloudFormationStackStatusChangeEventDetail {
    "stack-id": string;
    "status-details": {
        status: CloudFormationStackStatusChangeEventStatus;
        "status-reason": string;
    };
    "client-request-token": string;
}
export interface CloudFormationResourceStatusChangeDetail {
    "stack-id": string;
    "logical-resource-id": string;
    "physical-resource-id": string;
    "status-details": {
        status: string;
        "status-reason": string;
    };
    "resource-type": string;
    "client-request-token": string;
}
export type CloudFormationStatusChangeEvent = CloudFormationResourceStatusChangeEvent | CloudFormationStackStatusChangeEvent;
export declare const cloudFormationStackStatusChangeEvent: z.ZodObject<{
    source: z.ZodLiteral<"aws.cloudformation">;
    "detail-type": z.ZodLiteral<"CloudFormation Stack Status Change">;
    detail: z.ZodObject<{
        "stack-id": z.ZodString;
        "status-details": z.ZodObject<{
            status: z.ZodEnum<["CREATE_COMPLETE", "CREATE_IN_PROGRESS", "CREATE_FAILED", "DELETE_COMPLETE", "DELETE_FAILED", "DELETE_SKIPPED", "DELETE_IN_PROGRESS", "REVIEW_IN_PROGRESS", "ROLLBACK_COMPLETE", "ROLLBACK_FAILED", "ROLLBACK_IN_PROGRESS", "UPDATE_COMPLETE", "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_FAILED", "UPDATE_IN_PROGRESS", "UPDATE_ROLLBACK_COMPLETE", "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_ROLLBACK_FAILED", "UPDATE_ROLLBACK_IN_PROGRESS", "IMPORT_IN_PROGRESS", "IMPORT_COMPLETE", "IMPORT_ROLLBACK_IN_PROGRESS", "IMPORT_ROLLBACK_FAILED", "IMPORT_ROLLBACK_COMPLETE"]>;
            "status-reason": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }>;
        "client-request-token": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    }, {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    }>;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Stack Status Change";
    detail: {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    };
    time: string;
}, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Stack Status Change";
    detail: {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    };
    time: string;
}>;
export type CloudFormationStackStatusChangeEvent = z.output<typeof cloudFormationStackStatusChangeEvent>;
export declare const cloudFormationResourceStatusChangeEvent: z.ZodObject<{
    source: z.ZodLiteral<"aws.cloudformation">;
    "detail-type": z.ZodLiteral<"CloudFormation Resource Status Change">;
    detail: z.ZodObject<{
        "stack-id": z.ZodString;
        "logical-resource-id": z.ZodString;
        "physical-resource-id": z.ZodString;
        "status-details": z.ZodObject<{
            status: z.ZodEnum<["CREATE_COMPLETE", "CREATE_IN_PROGRESS", "CREATE_FAILED", "DELETE_COMPLETE", "DELETE_FAILED", "DELETE_SKIPPED", "DELETE_IN_PROGRESS", "REVIEW_IN_PROGRESS", "ROLLBACK_COMPLETE", "ROLLBACK_FAILED", "ROLLBACK_IN_PROGRESS", "UPDATE_COMPLETE", "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_FAILED", "UPDATE_IN_PROGRESS", "UPDATE_ROLLBACK_COMPLETE", "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_ROLLBACK_FAILED", "UPDATE_ROLLBACK_IN_PROGRESS", "IMPORT_IN_PROGRESS", "IMPORT_COMPLETE", "IMPORT_ROLLBACK_IN_PROGRESS", "IMPORT_ROLLBACK_FAILED", "IMPORT_ROLLBACK_COMPLETE"]>;
            "status-reason": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }>;
        "resource-type": z.ZodString;
        "client-request-token": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    }, {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    }>;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Resource Status Change";
    detail: {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    };
    time: string;
}, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Resource Status Change";
    detail: {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    };
    time: string;
}>;
export type CloudFormationResourceStatusChangeEvent = z.output<typeof cloudFormationResourceStatusChangeEvent>;
export declare const cloudFormationEvent: z.ZodDiscriminatedUnion<"detail-type", [z.ZodObject<{
    source: z.ZodLiteral<"aws.cloudformation">;
    "detail-type": z.ZodLiteral<"CloudFormation Stack Status Change">;
    detail: z.ZodObject<{
        "stack-id": z.ZodString;
        "status-details": z.ZodObject<{
            status: z.ZodEnum<["CREATE_COMPLETE", "CREATE_IN_PROGRESS", "CREATE_FAILED", "DELETE_COMPLETE", "DELETE_FAILED", "DELETE_SKIPPED", "DELETE_IN_PROGRESS", "REVIEW_IN_PROGRESS", "ROLLBACK_COMPLETE", "ROLLBACK_FAILED", "ROLLBACK_IN_PROGRESS", "UPDATE_COMPLETE", "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_FAILED", "UPDATE_IN_PROGRESS", "UPDATE_ROLLBACK_COMPLETE", "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_ROLLBACK_FAILED", "UPDATE_ROLLBACK_IN_PROGRESS", "IMPORT_IN_PROGRESS", "IMPORT_COMPLETE", "IMPORT_ROLLBACK_IN_PROGRESS", "IMPORT_ROLLBACK_FAILED", "IMPORT_ROLLBACK_COMPLETE"]>;
            "status-reason": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }>;
        "client-request-token": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    }, {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    }>;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Stack Status Change";
    detail: {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    };
    time: string;
}, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Stack Status Change";
    detail: {
        "stack-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "client-request-token": string;
    };
    time: string;
}>, z.ZodObject<{
    source: z.ZodLiteral<"aws.cloudformation">;
    "detail-type": z.ZodLiteral<"CloudFormation Resource Status Change">;
    detail: z.ZodObject<{
        "stack-id": z.ZodString;
        "logical-resource-id": z.ZodString;
        "physical-resource-id": z.ZodString;
        "status-details": z.ZodObject<{
            status: z.ZodEnum<["CREATE_COMPLETE", "CREATE_IN_PROGRESS", "CREATE_FAILED", "DELETE_COMPLETE", "DELETE_FAILED", "DELETE_SKIPPED", "DELETE_IN_PROGRESS", "REVIEW_IN_PROGRESS", "ROLLBACK_COMPLETE", "ROLLBACK_FAILED", "ROLLBACK_IN_PROGRESS", "UPDATE_COMPLETE", "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_FAILED", "UPDATE_IN_PROGRESS", "UPDATE_ROLLBACK_COMPLETE", "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS", "UPDATE_ROLLBACK_FAILED", "UPDATE_ROLLBACK_IN_PROGRESS", "IMPORT_IN_PROGRESS", "IMPORT_COMPLETE", "IMPORT_ROLLBACK_IN_PROGRESS", "IMPORT_ROLLBACK_FAILED", "IMPORT_ROLLBACK_COMPLETE"]>;
            "status-reason": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }, {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        }>;
        "resource-type": z.ZodString;
        "client-request-token": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    }, {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    }>;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Resource Status Change";
    detail: {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    };
    time: string;
}, {
    source: "aws.cloudformation";
    "detail-type": "CloudFormation Resource Status Change";
    detail: {
        "stack-id": string;
        "logical-resource-id": string;
        "physical-resource-id": string;
        "status-details": {
            status: "CREATE_COMPLETE" | "CREATE_FAILED" | "CREATE_IN_PROGRESS" | "DELETE_COMPLETE" | "DELETE_FAILED" | "DELETE_IN_PROGRESS" | "DELETE_SKIPPED" | "IMPORT_COMPLETE" | "IMPORT_IN_PROGRESS" | "IMPORT_ROLLBACK_COMPLETE" | "IMPORT_ROLLBACK_FAILED" | "IMPORT_ROLLBACK_IN_PROGRESS" | "REVIEW_IN_PROGRESS" | "ROLLBACK_COMPLETE" | "ROLLBACK_FAILED" | "ROLLBACK_IN_PROGRESS" | "UPDATE_COMPLETE" | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_FAILED" | "UPDATE_IN_PROGRESS" | "UPDATE_ROLLBACK_COMPLETE" | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS" | "UPDATE_ROLLBACK_FAILED" | "UPDATE_ROLLBACK_IN_PROGRESS";
            "status-reason": string;
        };
        "resource-type": string;
        "client-request-token": string;
    };
    time: string;
}>]>;
export type CloudFormationEvent = z.output<typeof cloudFormationEvent>;
