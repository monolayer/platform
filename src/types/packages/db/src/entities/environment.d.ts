import { Entity, EntityRepository, type FormattedItem, type InputItem, type TransformedItem } from "dynamodb-toolbox";
export declare const Environment: Entity<"ENVIRONMENT", import("dynamodb-toolbox").Table<{
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
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"ENVIRONMENT", "-">;
    }>;
    name: import("dynamodb-toolbox").StringSchema<{}>;
    project: import("dynamodb-toolbox").StringSchema<{}>;
    branchName: import("dynamodb-toolbox").StringSchema<{}>;
    resources: import("dynamodb-toolbox").RecordSchema<import("dynamodb-toolbox").StringSchema<{}>, import("dynamodb-toolbox").RecordSchema<import("dynamodb-toolbox").StringSchema<{}>, import("dynamodb-toolbox").MapSchema<{
        PhysicalResourceId: import("dynamodb-toolbox").StringSchema<{}>;
        ResourceType: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>, {}>, {}>;
    cidrBlock: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    availabilityZoneNames: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").StringSchema<{}>, {
        putDefault: unknown;
    }>;
    network: import("dynamodb-toolbox").MapSchema<{
        vpcID: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
        publicSubnets: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").StringSchema<{}>, {
            putDefault: unknown;
        }>;
        privateSubnets: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").StringSchema<{}>, {
            putDefault: unknown;
        }>;
    }, {
        required: "never";
    }>;
    edge: import("dynamodb-toolbox").MapSchema<{
        distributionId: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
        domainName: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
    }, {
        required: "never";
    }>;
    ecs: import("dynamodb-toolbox").MapSchema<{
        cluster: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
        clusterArn: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
    }, {
        required: "never";
    }>;
    currentDeployment: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    previousDeploymentSK: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    currentDeploymentSK: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    status: import("dynamodb-toolbox").StringSchema<{
        enum: ["CREATING", "CREATED", "CREATE_FAILED", "DELETING", "DELETED", "DELETE_FAILED", "UPDATING", "UPDATED", "UPDATE_FAILED", "DEPLOYING", "DEPLOYED", "DEPLOY_FAILED"];
        putDefault: unknown;
        required: "never";
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export type Environment = TransformedItem<typeof Environment>;
export type FormattedEnvironment = FormattedItem<typeof Environment>;
export type InputEnvironment = InputItem<typeof Environment>;
export declare const EnvironmentRepository: EntityRepository<Entity<"ENVIRONMENT", import("dynamodb-toolbox").Table<{
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
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"ENVIRONMENT", "-">;
    }>;
    name: import("dynamodb-toolbox").StringSchema<{}>;
    project: import("dynamodb-toolbox").StringSchema<{}>;
    branchName: import("dynamodb-toolbox").StringSchema<{}>;
    resources: import("dynamodb-toolbox").RecordSchema<import("dynamodb-toolbox").StringSchema<{}>, import("dynamodb-toolbox").RecordSchema<import("dynamodb-toolbox").StringSchema<{}>, import("dynamodb-toolbox").MapSchema<{
        PhysicalResourceId: import("dynamodb-toolbox").StringSchema<{}>;
        ResourceType: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>, {}>, {}>;
    cidrBlock: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    availabilityZoneNames: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").StringSchema<{}>, {
        putDefault: unknown;
    }>;
    network: import("dynamodb-toolbox").MapSchema<{
        vpcID: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
        publicSubnets: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").StringSchema<{}>, {
            putDefault: unknown;
        }>;
        privateSubnets: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").StringSchema<{}>, {
            putDefault: unknown;
        }>;
    }, {
        required: "never";
    }>;
    edge: import("dynamodb-toolbox").MapSchema<{
        distributionId: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
        domainName: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
    }, {
        required: "never";
    }>;
    ecs: import("dynamodb-toolbox").MapSchema<{
        cluster: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
        clusterArn: import("dynamodb-toolbox").StringSchema<{
            putDefault: unknown;
        }>;
    }, {
        required: "never";
    }>;
    currentDeployment: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    previousDeploymentSK: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    currentDeploymentSK: import("dynamodb-toolbox").StringSchema<{
        putDefault: unknown;
    }>;
    status: import("dynamodb-toolbox").StringSchema<{
        enum: ["CREATING", "CREATED", "CREATE_FAILED", "DELETING", "DELETED", "DELETE_FAILED", "UPDATING", "UPDATED", "UPDATE_FAILED", "DEPLOYING", "DEPLOYED", "DEPLOY_FAILED"];
        putDefault: unknown;
        required: "never";
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>>;
