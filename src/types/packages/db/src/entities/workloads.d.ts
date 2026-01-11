import { Entity, type TransformedItem } from "dynamodb-toolbox";
import { z } from "zod/v3";
export declare const Workloads: Entity<"WORKLOADS", import("dynamodb-toolbox").Table<{
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
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"DEPLOYMENT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        enum: ["WORKLOADS"];
        key: true;
        putDefault: unknown;
        required: "always";
    }>;
    deploymentId: import("dynamodb-toolbox").StringSchema<{
        required: "atLeastOnce";
    }>;
    _wp: import("dynamodb-toolbox").StringSchema<{
        enum: ["true"];
        putDefault: unknown;
    }>;
    _progressType: import("dynamodb-toolbox").StringSchema<{
        enum: ["WORKLOADS"];
        putDefault: unknown;
    }>;
    progress: import("dynamodb-toolbox").StringSchema<{
        enum: ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
    }>;
    postgresDatabase: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["PostgresDatabase"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    mysqlDatabase: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["MySqlDatabase"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    mongoDatabase: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["MongoDatabase"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    elasticSearch: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["ElasticSearch"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    bucket: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["Bucket"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    mailer: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["Mailer"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    redis: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["Redis"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    cron: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["Cron"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        schedule: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
    task: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        type: import("dynamodb-toolbox").StringSchema<{
            enum: ["Task"];
            putDefault: unknown;
            required: "atLeastOnce";
        }>;
        id: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
        file: import("dynamodb-toolbox").StringSchema<{
            required: "atLeastOnce";
        }>;
    }, {}>, {}>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export declare function assertWorkloads(image: unknown): asserts image is Workloads;
export type Workloads = TransformedItem<typeof Workloads>;
export declare const WorkloadsProgressSchema: z.ZodObject<{
    type: z.ZodLiteral<"WORKLOADS">;
    progress: z.ZodEnum<["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"]>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "WORKLOADS";
    progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCESS";
    updatedAt: string;
}, {
    type: "WORKLOADS";
    progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCESS";
    updatedAt: string;
}>;
export type WorkloadsProgressEvent = z.TypeOf<typeof WorkloadsProgressSchema>;
