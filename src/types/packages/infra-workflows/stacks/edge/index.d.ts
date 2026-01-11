import { Stack } from "@awboost/cfn-template-builder/stack";
import type { FormattedProject } from "../../../db/src/entities";
import { type BlueprintContext } from "../types";
export declare function edgeStack(opts: BlueprintContext & {
    workloads: string;
    sourceVersion: string;
    project: FormattedProject;
}): Promise<Stack>;
export declare function edgeStackString(opts: BlueprintContext & {
    workloads: string;
    sourceVersion: string;
    project: FormattedProject;
}): Promise<string>;
