import { ECSClient, type RunTaskCommandInput } from "@aws-sdk/client-ecs";
export declare function ecsClusterDescription(clusterName: string, opts?: {
    client?: ECSClient;
}): Promise<import("@aws-sdk/client-ecs").Cluster | undefined>;
export declare function taskDefinitionArn(taskDefinitionName: string, client?: ECSClient): Promise<string | undefined>;
export declare function runTask(params: RunTaskCommandInput, client?: ECSClient): Promise<import("@aws-sdk/client-ecs").RunTaskCommandOutput>;
