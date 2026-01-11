import { Stack, type BlueprintContext } from "../types";
export declare function assetsBucketStack(context: BlueprintContext & {
    emptyAssets?: boolean;
}): Stack;
export declare function assetsBucketStackString(opts: BlueprintContext): Promise<string>;
