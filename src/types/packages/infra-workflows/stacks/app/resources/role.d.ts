import type { DynamoDBTable } from "@awboost/cfn-resource-types/AWS-DynamoDB-Table";
import { IAMRole, type S3Bucket } from "../../types";
export declare function cronSchedulerRole(): IAMRole;
export declare function lambdaTasksRole(table: DynamoDBTable, name?: string): IAMRole;
export declare function lambdaRole(opts?: {
    cacheBucket: S3Bucket;
    cacheTagsTable: DynamoDBTable;
}): IAMRole;
export declare function lambdaBroadcastRole(table: DynamoDBTable): IAMRole;
