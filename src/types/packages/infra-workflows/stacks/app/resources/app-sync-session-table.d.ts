import { DynamoDBTable } from "@awboost/cfn-resource-types/AWS-DynamoDB-Table";
import type { InventoryMap } from "../../../../db/src/inventory";
import { type Stack } from "../../types";
export declare function broadcastSessionTable(stack: Stack, inventoryMap: InventoryMap): DynamoDBTable;
