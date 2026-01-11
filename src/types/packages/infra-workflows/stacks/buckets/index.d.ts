import { Stack, type BlueprintContext } from "../types";
export declare function bucketsStack(context: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    customDomain?: {
        fqdn: string;
        rootRedirect: boolean;
    };
}): Stack;
export declare function bucketsStackString(opts: BlueprintContext & {
    sourceVersion: string;
    workloads: string;
    customDomain?: {
        fqdn: string;
        rootRedirect: boolean;
    };
}): Promise<string>;
export interface BucketData {
    type: string;
    id: string;
    publicAccess?: Record<string, string[]>;
}
