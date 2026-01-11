import type { BlueprintContext } from "../../../../db/src/inventory";
import { SQSQueue, Stack } from "../../types";
import type { EnvVar } from "../types";
export declare function appQueues(context: BlueprintContext, parsedWorkloads: any, stack: Stack, envVars: EnvVar[]): Record<string, SQSQueue>;
