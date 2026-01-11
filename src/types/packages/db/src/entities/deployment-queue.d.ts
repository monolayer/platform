import { Entity, EntityRepository, type TransformedItem } from "dynamodb-toolbox";
export declare const DeploymentQueue: Entity<"DEPLOYMENT_QUEUE", import("dynamodb-toolbox").Table<{
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
    PK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"DEPLOYMENT_QUEUE", "-">;
    }>;
    next: import("dynamodb-toolbox").MapSchema<{
        commitDate: import("dynamodb-toolbox").StringSchema<{}>;
        commitMessage: import("dynamodb-toolbox").StringSchema<{}>;
        commitAuthor: import("dynamodb-toolbox").StringSchema<{}>;
        commitSHA: import("dynamodb-toolbox").StringSchema<{}>;
        deploymentNumber: import("dynamodb-toolbox").StringSchema<{}>;
        environment: import("dynamodb-toolbox").StringSchema<{}>;
        deploymentProject: import("dynamodb-toolbox").StringSchema<{}>;
        branchName: import("dynamodb-toolbox").StringSchema<{}>;
        workloads: import("dynamodb-toolbox").StringSchema<{}>;
    }, {
        required: "never";
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export type DeploymentQueue = TransformedItem<typeof DeploymentQueue>;
export declare const DeploymentQueueRepository: EntityRepository<Entity<"DEPLOYMENT_QUEUE", import("dynamodb-toolbox").Table<{
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
    PK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"DEPLOYMENT_QUEUE", "-">;
    }>;
    next: import("dynamodb-toolbox").MapSchema<{
        commitDate: import("dynamodb-toolbox").StringSchema<{}>;
        commitMessage: import("dynamodb-toolbox").StringSchema<{}>;
        commitAuthor: import("dynamodb-toolbox").StringSchema<{}>;
        commitSHA: import("dynamodb-toolbox").StringSchema<{}>;
        deploymentNumber: import("dynamodb-toolbox").StringSchema<{}>;
        environment: import("dynamodb-toolbox").StringSchema<{}>;
        deploymentProject: import("dynamodb-toolbox").StringSchema<{}>;
        branchName: import("dynamodb-toolbox").StringSchema<{}>;
        workloads: import("dynamodb-toolbox").StringSchema<{}>;
    }, {
        required: "never";
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>>;
