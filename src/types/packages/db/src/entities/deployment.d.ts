import type { StreamRecord } from "aws-lambda";
import { Entity, EntityRepository, type FormattedItem, type InputValue, type TransformedItem } from "dynamodb-toolbox";
import { type DeploymentProgressState, type ProgressState } from "../progress";
export declare const Deployment: Entity<"DEPLOYMENT", import("dynamodb-toolbox").Table<{
    name: "PK";
    type: "string";
}, {
    name: "SK";
    type: "string";
}, {
    "GSI1-index": {
        type: "global";
        partitionKey: {
            name: "GSI1";
            type: "string";
        };
    };
}, "_et">, {
    GSI1: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    PK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: {
            encode: (input: string) => string;
            decode: (saved: string) => string;
        };
    }>;
    _appSync: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
        updateDefault: unknown;
    }>;
    _appSyncChannel: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    _appSyncEvent: import("dynamodb-toolbox").StringSchema<{
        putLink: unknown;
        updateLink: unknown;
    }>;
    _version: import("dynamodb-toolbox").NumberSchema<{
        putDefault: unknown;
    }>;
    commitAuthor: import("dynamodb-toolbox").StringSchema<{}>;
    commitDate: import("dynamodb-toolbox").StringSchema<{}>;
    commitMessage: import("dynamodb-toolbox").StringSchema<{}>;
    commitSHA: import("dynamodb-toolbox").StringSchema<{}>;
    current: import("dynamodb-toolbox").BooleanSchema<{
        putDefault: unknown;
    }>;
    deploymentProgress: import("dynamodb-toolbox").MapSchema<{
        all: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
        }>;
        webhook: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
        }>;
        images: import("dynamodb-toolbox").MapSchema<{
            all: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            app: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            crons: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            tasks: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
        }, {}>;
        bootstrap: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            required: "never";
        }>;
        beforeRollout: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            required: "never";
        }>;
        afterRollout: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            required: "never";
        }>;
        stacks: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
            name: import("dynamodb-toolbox").StringSchema<{}>;
            stackName: import("dynamodb-toolbox").StringSchema<{}>;
            progress: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            time: import("dynamodb-toolbox").StringSchema<{}>;
        }, {}>, {}>;
    }, {}>;
    deploymentProject: import("dynamodb-toolbox").StringSchema<{}>;
    environment: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    runId: import("dynamodb-toolbox").StringSchema<{
        required: "never";
    }>;
    webhookBuildId: import("dynamodb-toolbox").StringSchema<{}>;
    workloads: import("dynamodb-toolbox").StringSchema<{}>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export declare function assertDeployment(image: unknown): asserts image is Deployment;
export type Deployment = TransformedItem<typeof Deployment>;
export type FormattedDeployment = FormattedItem<typeof Deployment>;
type EventStatusProgress = Extract<ProgressState, "PENDING" | "IN_PROGRESS" | "FAILED" | "SUCCESS">;
export type DeploymentProgress = InputValue<(typeof Deployment)["schema"]>["deploymentProgress"];
export declare function updateDeploymentImageProgress(opts: {
    projectId: string;
    deployment: string;
    key: "all" | "app" | "crons" | "tasks";
    progress: EventStatusProgress;
    retries?: number;
}): Promise<boolean | undefined>;
export declare function updateDeploymentStackProgress(opts: {
    projectId: string;
    deployment: string;
    key: string;
    stackName: string;
    progress: EventStatusProgress;
    retries?: number;
}): Promise<boolean | undefined>;
export declare function markDeploymentProgressAsFailed(opts: {
    projectId: string;
    deployment: string;
    retries?: number;
}): Promise<boolean | undefined>;
export declare function imageBuildStatus(progress: {
    app: DeploymentProgressState;
    crons: DeploymentProgressState;
    tasks: DeploymentProgressState;
}): "FAILED" | "IN_PROGRESS" | "SUCCESS" | undefined;
interface StackProgress {
    name: string;
    progress: DeploymentProgressState;
    stackName: string;
    time: string;
}
export declare function updateStackProgress(stackProgressArray: StackProgress[], name: string, stackName: string, progress: DeploymentProgressState): StackProgress[];
export type DeploymentRecord = {
    PK: string;
    SK: string;
    GSI1: string;
    environment: string;
    commitSHA: string;
    commitDate: string;
    commitMessage: string;
    commitAuthor: string;
    deploymentProject: string;
    deploymentProgress: {
        all: DeploymentProgressState;
        webhook: DeploymentProgressState;
        bootstrap?: DeploymentProgressState;
        beforeRollout?: DeploymentProgressState;
        afterRollout?: DeploymentProgressState;
        images: {
            all: DeploymentProgressState;
            app: DeploymentProgressState;
            crons: DeploymentProgressState;
            tasks: DeploymentProgressState;
        };
        stacks: {
            name: string;
            stackName: string;
            progress: DeploymentProgressState;
            time: string;
        }[];
        runId?: string;
    };
};
export declare function parseDeployment(record: StreamRecord): {
    GSI1: string;
    PK: string;
    SK: string;
    _appSync: string;
    _appSyncChannel: string;
    _appSyncEvent: string;
    _version: number;
    commitAuthor: string;
    commitDate: string;
    commitMessage: string;
    commitSHA: string;
    created: string;
    current: boolean;
    deploymentProgress: {
        afterRollout?: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS" | undefined;
        all: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
        beforeRollout?: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS" | undefined;
        bootstrap?: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS" | undefined;
        images: {
            all: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            app: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            crons: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            tasks: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
        };
        stacks: {
            name: string;
            progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            stackName: string;
            time: string;
        }[];
        webhook: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
    };
    deploymentProject: string;
    environment: string;
    modified: string;
    runId?: string | undefined;
    webhookBuildId: string;
    workloads: string;
} | undefined;
export declare const DeploymentRepository: EntityRepository<Entity<"DEPLOYMENT", import("dynamodb-toolbox").Table<{
    name: "PK";
    type: "string";
}, {
    name: "SK";
    type: "string";
}, {
    "GSI1-index": {
        type: "global";
        partitionKey: {
            name: "GSI1";
            type: "string";
        };
    };
}, "_et">, {
    GSI1: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    PK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: {
            encode: (input: string) => string;
            decode: (saved: string) => string;
        };
    }>;
    _appSync: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
        updateDefault: unknown;
    }>;
    _appSyncChannel: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    _appSyncEvent: import("dynamodb-toolbox").StringSchema<{
        putLink: unknown;
        updateLink: unknown;
    }>;
    _version: import("dynamodb-toolbox").NumberSchema<{
        putDefault: unknown;
    }>;
    commitAuthor: import("dynamodb-toolbox").StringSchema<{}>;
    commitDate: import("dynamodb-toolbox").StringSchema<{}>;
    commitMessage: import("dynamodb-toolbox").StringSchema<{}>;
    commitSHA: import("dynamodb-toolbox").StringSchema<{}>;
    current: import("dynamodb-toolbox").BooleanSchema<{
        putDefault: unknown;
    }>;
    deploymentProgress: import("dynamodb-toolbox").MapSchema<{
        all: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
        }>;
        webhook: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
        }>;
        images: import("dynamodb-toolbox").MapSchema<{
            all: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            app: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            crons: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            tasks: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
        }, {}>;
        bootstrap: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            required: "never";
        }>;
        beforeRollout: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            required: "never";
        }>;
        afterRollout: import("dynamodb-toolbox").StringSchema<{
            enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            required: "never";
        }>;
        stacks: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
            name: import("dynamodb-toolbox").StringSchema<{}>;
            stackName: import("dynamodb-toolbox").StringSchema<{}>;
            progress: import("dynamodb-toolbox").StringSchema<{
                enum: ["PENDING", "IN_PROGRESS", "IMAGE_BUILD", "EDGE_AND_LB_PROVISION", "STATEFUL_WORKLOADS_DEPLOY", "STATELESS_WORKLOADS_DEPLOY", "STATEFUL_WORKLOADS_DELETE", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
            }>;
            time: import("dynamodb-toolbox").StringSchema<{}>;
        }, {}>, {}>;
    }, {}>;
    deploymentProject: import("dynamodb-toolbox").StringSchema<{}>;
    environment: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    runId: import("dynamodb-toolbox").StringSchema<{
        required: "never";
    }>;
    webhookBuildId: import("dynamodb-toolbox").StringSchema<{}>;
    workloads: import("dynamodb-toolbox").StringSchema<{}>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>>;
export {};
