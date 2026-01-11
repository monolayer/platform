import { Stack } from "@awboost/cfn-template-builder/stack";
import type { EnvVar } from "../app/types";
import { type BlueprintContext } from "../types";
export declare function lifecycleStack(context: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    envVars: EnvVar[];
}, options?: {
    cpu: string;
    memory: string;
    cpuArchitecture: string;
    operatingSystemFamily: string;
    containerPort: number;
    hostPort: number;
}): Stack;
export declare function lifecycleStackString(opts: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    envVars: EnvVar[];
}): Promise<string>;
