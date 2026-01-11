import { DynamoDBTable } from "@awboost/cfn-resource-types/AWS-DynamoDB-Table";
import type { InventoryMap } from "../../../../db/src/inventory";
export declare function dynamoDBTasksTable(inventoryMap: InventoryMap): DynamoDBTable;
