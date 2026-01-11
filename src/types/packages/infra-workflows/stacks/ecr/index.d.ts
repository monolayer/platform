import { Stack, type BlueprintContext } from "../types";
export declare function ecrStack(context: BlueprintContext): Stack;
export declare function ecrStackString(opts: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
}): Promise<string>;
