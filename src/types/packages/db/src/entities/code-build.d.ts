import { Entity, type TransformedItem } from "dynamodb-toolbox";
import { z } from "zod/v3";
import { type ProgressState } from "../progress";
export declare const CodeBuild: Entity<"PROJECT_CODE_BUILD", import("dynamodb-toolbox").Table<{
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
        enum: ["PROJECT_CODE_BUILD"];
        key: true;
        putDefault: unknown;
        required: "always";
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
    progress: import("dynamodb-toolbox").StringSchema<{
        enum: ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
    }>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export type CodeBuild = TransformedItem<typeof CodeBuild>;
export declare const CodeBuildProgressSchema: z.ZodObject<{
    type: z.ZodLiteral<"PROJECT_CODE_BUILD">;
    progress: z.ZodEnum<["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"]>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "PROJECT_CODE_BUILD";
    progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCESS";
    updatedAt: string;
}, {
    type: "PROJECT_CODE_BUILD";
    progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCESS";
    updatedAt: string;
}>;
export type CodeBuildProgressEvent = z.TypeOf<typeof CodeBuildProgressSchema>;
export type CodeBuildRecord = {
    PK: string;
    SK: string;
    progress: ProgressState;
    modified: string;
};
