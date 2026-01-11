import { AppSyncApi } from "@awboost/cfn-resource-types/AWS-AppSync-Api";
import type { InventoryMap } from "../../../../db/src/inventory";
import { type ParameterInstance, type Stack } from "../../types";
import type { EnvVar } from "../types";
export declare function broadcast(opts: {
    projectName: string;
    context: {
        sourceVersion: string;
        environment: string;
    };
    parsedWorkloads: any;
    stack: Stack;
    inventoryMap: InventoryMap;
    vpcIdParameter: ParameterInstance;
    subnetsParameter: ParameterInstance;
    envVars: EnvVar[];
}): AppSyncApi | undefined;
