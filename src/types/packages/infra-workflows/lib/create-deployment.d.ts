import type { BuildDetails } from "./build-schema";
export declare function createDeployment({ buildDetails, workloads, runId }: {
    buildDetails: BuildDetails;
    workloads: string;
    runId?: string;
}): Promise<{
    GSI1: string;
    PK: string;
    SK: string;
    _appSync: string;
    _appSyncChannel: string;
    _appSyncEvent: string;
    _version: number;
    commitAuthor: string;
    commitDate: string;
    commitMessage: string;
    commitSHA: string;
    created: string;
    current: boolean;
    deploymentProgress: {
        afterRollout?: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS" | undefined;
        all: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
        beforeRollout?: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS" | undefined;
        bootstrap?: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS" | undefined;
        images: {
            all: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            app: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            crons: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            tasks: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
        };
        stacks: {
            name: string;
            progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
            stackName: string;
            time: string;
        }[];
        webhook: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "EDGE_AND_LB_PROVISION" | "FAILED" | "IMAGE_BUILD" | "IN_PROGRESS" | "PENDING" | "STATEFUL_WORKLOADS_DELETE" | "STATEFUL_WORKLOADS_DEPLOY" | "STATELESS_WORKLOADS_DEPLOY" | "SUCCESS";
    };
    deploymentProject: string;
    entity: "DEPLOYMENT";
    environment: string;
    modified: string;
    runId?: string | undefined;
    webhookBuildId: string;
    workloads: string;
}>;
