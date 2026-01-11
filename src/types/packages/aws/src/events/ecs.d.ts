import type { EventBridgeEvent } from "aws-lambda";
import { z } from "zod/v3";
export declare const ecsServiceActionSchema: z.ZodObject<{
    source: z.ZodLiteral<"aws.ecs">;
    "detail-type": z.ZodLiteral<"ECS Service Action">;
    detail: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    source: "aws.ecs";
    "detail-type": "ECS Service Action";
    detail?: any;
}, {
    source: "aws.ecs";
    "detail-type": "ECS Service Action";
    detail?: any;
}>;
export declare const ecsDeploymentStateChangeSchema: z.ZodObject<{
    source: z.ZodLiteral<"aws.ecs">;
    "detail-type": z.ZodLiteral<"ECS Deployment State Change">;
    detail: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    source: "aws.ecs";
    "detail-type": "ECS Deployment State Change";
    detail?: any;
}, {
    source: "aws.ecs";
    "detail-type": "ECS Deployment State Change";
    detail?: any;
}>;
export type ECSCronEvent = EventBridgeEvent<"ECS Task State Change", unknown>;
export type ECSDeploymentChangeEvent = EventBridgeEvent<"ECS Service Action" | "ECS Deployment State Change", unknown>;
