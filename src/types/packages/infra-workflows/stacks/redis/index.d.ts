import { Stack, type BlueprintContext } from "../types";
export declare function redisStack(context: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
}): Stack;
export declare function redisStackString(opts: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
}): Promise<string>;
