import type { FormattedProject } from "../../../db/src/entities";
import { Stack, type BlueprintContext } from "../types";
import type { AppOptions, AppStackContext, EnvVar } from "./types";
export declare function appStack(context: AppStackContext, options?: AppOptions): Promise<{
    stack: Stack;
    envVars: EnvVar[];
}>;
export declare function appBootstrapStack(context: Omit<AppStackContext, "project">): Stack;
export declare function appStackString(opts: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    initial: boolean;
    project: FormattedProject;
    buildEnvVars: {
        parameterName: string;
        name: string;
        value: string;
    }[];
}): Promise<{
    stack: string;
    envVars: EnvVar[];
}>;
