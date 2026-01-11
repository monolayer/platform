import type { EventBridgeEvent } from "aws-lambda";
import z from "zod/v3";
export type SSMParameterStoreChangeEvent = EventBridgeEvent<"Parameter Store Change", {
    operation: string;
    name: string;
    type: string;
    description: string;
}>;
export declare const ssmParameterStoreChangeEventSchema: z.ZodObject<{
    "detail-type": z.ZodLiteral<"Parameter Store Change">;
    detail: z.ZodObject<{
        operation: z.ZodString;
        name: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        operation: string;
        name: string;
        type: string;
    }, {
        operation: string;
        name: string;
        type: string;
    }>;
}, "strip", z.ZodTypeAny, {
    "detail-type": "Parameter Store Change";
    detail: {
        operation: string;
        name: string;
        type: string;
    };
}, {
    "detail-type": "Parameter Store Change";
    detail: {
        operation: string;
        name: string;
        type: string;
    };
}>;
export type SsmParameterStoreChangeEventSchema = z.output<typeof ssmParameterStoreChangeEventSchema>;
