import type { InventoryMap } from "../../../../db/src/inventory";
import { S3Bucket, type Parameter, type Stack } from "../../types";
export declare function cacheBucket(stack: Stack, inventoryMap: InventoryMap, emptierFunction: Parameter): S3Bucket;
