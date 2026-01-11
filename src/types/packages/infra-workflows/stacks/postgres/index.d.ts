import type { FormattedProject } from "../../../db/src/entities";
import { Stack, type BlueprintContext } from "../types";
export declare function postgresStack(context: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    project: FormattedProject;
}): Stack;
export declare function postgresStackString(opts: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    project: FormattedProject;
}): Promise<string>;
