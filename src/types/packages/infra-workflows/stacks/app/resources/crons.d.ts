import type { InventoryMap } from "../../../../db/src/inventory";
import type { ParameterInstance, Stack } from "../../types";
import type { AppOptions, AppStackContext, EnvVar } from "../types";
export declare function crons(projectName: string, context: AppStackContext, parsedWorkloads: any, stack: Stack, inventoryMap: InventoryMap, vpcId: ParameterInstance, envVars: EnvVar[], clusterArn: ParameterInstance, publicSubnets: ParameterInstance, cloudfrontDomainNameParameter: ParameterInstance, realtimeHost: ParameterInstance | undefined, options?: AppOptions): void;
