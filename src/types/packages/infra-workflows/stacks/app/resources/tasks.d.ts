import type { DynamoDBTable } from "@awboost/cfn-resource-types/AWS-DynamoDB-Table";
import type { InventoryMap } from "../../../../db/src/inventory";
import { type ParameterInstance, type SQSQueue, type Stack } from "../../types";
import type { AppStackContext, EnvVar } from "../types";
export declare function tasks(projectName: string, context: AppStackContext, tasksTable: DynamoDBTable, parsedWorkloads: any, stack: Stack, inventoryMap: InventoryMap, vpcIdParameter: ParameterInstance, subnetsParameter: ParameterInstance, envVars: EnvVar[], queues: Record<string, SQSQueue>, cloudfrontDomainNameParameter: ParameterInstance, realtimeHost: ParameterInstance | undefined): void;
