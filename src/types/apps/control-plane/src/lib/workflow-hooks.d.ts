import type { CloudFormationHook } from "../../../../packages/aws/src/cloudformation";
export type BuildHook = {
    status: "success" | "failure";
};
export type TaskHook = {
    status: "success" | "failure";
};
export declare function cloudformationHook(stackName: string, log: {
    groupName: string;
    streamName: string;
}): import("workflow").Hook<CloudFormationHook>;
