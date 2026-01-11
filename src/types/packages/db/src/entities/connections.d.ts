import { Entity, EntityRepository, type FormattedItem, type InputItem, type TransformedItem } from "dynamodb-toolbox";
export declare const Connection: Entity<"CONNECTION", import("dynamodb-toolbox").Table<{
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
        keyDefault: unknown;
        required: "always";
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"CONNECTION", "-">;
    }>;
    name: import("dynamodb-toolbox").StringSchema<{}>;
    arn: import("dynamodb-toolbox").StringSchema<{}>;
    provider: import("dynamodb-toolbox").StringSchema<{
        enum: ["github", "gitlab"];
    }>;
    status: import("dynamodb-toolbox").StringSchema<{
        enum: ["pending", "available", "error"];
        putDefault: unknown;
        required: "never";
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export type Connection = TransformedItem<typeof Connection>;
export type FormattedConnection = FormattedItem<typeof Connection>;
export type InputConnection = InputItem<typeof Connection>;
export declare const ConnectionRepository: EntityRepository<Entity<"CONNECTION", import("dynamodb-toolbox").Table<{
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
        keyDefault: unknown;
        required: "always";
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"CONNECTION", "-">;
    }>;
    name: import("dynamodb-toolbox").StringSchema<{}>;
    arn: import("dynamodb-toolbox").StringSchema<{}>;
    provider: import("dynamodb-toolbox").StringSchema<{
        enum: ["github", "gitlab"];
    }>;
    status: import("dynamodb-toolbox").StringSchema<{
        enum: ["pending", "available", "error"];
        putDefault: unknown;
        required: "never";
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>>;
