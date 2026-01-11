import { Stack } from "@awboost/cfn-template-builder/stack";
import { CloudFormationClient, type StackResourceSummary, type Tag } from "@aws-sdk/client-cloudformation";
import type { CloudFormationStackStatusChangeEventStatus, CloudFormationStatusChangeEvent } from "./events";
export declare function listStackResources(stackName: string, opts?: {
    client?: CloudFormationClient;
}): Promise<StackResourceSummary[]>;
export declare function createdOrUpdatedStackResources(stackName: string, opts?: {
    client?: CloudFormationClient;
}): Promise<StackResourceSummary[]>;
export declare function stackEnvironment(stackName: string, opts?: {
    client?: CloudFormationClient;
}): Promise<{
    PK: string;
    SK: string;
    availabilityZoneNames: string[];
    branchName: string;
    cidrBlock: string;
    created: string;
    currentDeployment: string;
    currentDeploymentSK: string;
    ecs?: {
        cluster: string;
        clusterArn: string;
    } | undefined;
    edge?: {
        distributionId: string;
        domainName: string;
    } | undefined;
    modified: string;
    name: string;
    network?: {
        privateSubnets: string[];
        publicSubnets: string[];
        vpcID: string;
    } | undefined;
    previousDeploymentSK: string;
    project: string;
    resources: {
        [x: string]: {
            [x: string]: {
                PhysicalResourceId: string;
                ResourceType: string;
            };
        };
    };
    status?: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING" | undefined;
} | undefined>;
/**
 * Checks whether a CloudFormation stack exists.
 *
 * This function attempts to describe the specified stack using the AWS CloudFormation API.
 * If the stack exists, it returns true. If the stack does not exist (ValidationError),
 * it returns false. Any other errors are re-thrown.
 *
 * @param stackName - The name of the CloudFormation stack to check.
 * @param opts - Optional configuration options.
 * @param opts.client - An optional CloudFormation client to use instead of the default client.
 * @returns A promise that resolves to true if the stack exists, false otherwise.
 * @throws Re-throws any errors other than ValidationError (which indicates the stack doesn't exist).
 */
export declare function stackExists(stackName: string, opts?: {
    client: CloudFormationClient;
}): Promise<boolean>;
/**
 * Creates a new CloudFormation stack.
 *
 * This function sends a CreateStackCommand to the AWS CloudFormation service to create a new stack.
 * It includes the stack name, template body, and capabilities (IAM and named IAM).
 * The client request token is also provided to ensure idempotency.
 *
 * @param name - The name of the stack to create.
 * @param template - The template body for the stack.
 * @param token - The client request token for idempotency.
 * @param opts - Optional configuration options.
 * @param opts.client - An optional CloudFormation client to use instead of the default client.
 * @returns A promise that resolves when the stack creation is complete.
 * @throws Throws an error if the stack creation fails.
 */
export declare function createStack(name: string, template: string, token: string, opts?: {
    client?: CloudFormationClient;
    tags?: Tag[];
}): Promise<void>;
/**
 * Updates an existing CloudFormation stack.
 *
 * This function sends an UpdateStackCommand to the AWS CloudFormation service to update an existing stack.
 * It includes the stack name, template body, and capabilities (IAM and named IAM).
 * The client request token is also provided to ensure idempotency.
 *
 * @param name - The name of the stack to update.
 * @param template - The template body for the stack.
 * @param token - The client request token for idempotency.
 * @param opts - Optional configuration options.
 * @param opts.client - An optional CloudFormation client to use instead of the default client.
 * @returns A promise that resolves when the stack update is complete.
 * @throws Throws an error if the stack update fails.
 */
export declare function updateCFStack(name: string, template: string, token: string, opts?: {
    client?: CloudFormationClient;
    tags?: Tag[];
}): Promise<void>;
/**
 * Deletes a CloudFormation stack.
 *
 * This function sends a DeleteStackCommand to the AWS CloudFormation service to delete a stack.
 * It includes the stack name and client request token for idempotency.
 *
 * @param name - The name of the stack to delete.
 * @param token - The client request token for idempotency.
 * @param opts - Optional configuration options.
 * @param opts.client - An optional CloudFormation client to use instead of the default client.
 * @returns A promise that resolves when the stack deletion is complete.
 * @throws Throws an error if the stack deletion fails.
 */
export declare function deleteStack(name: string, token: string, opts?: {
    client?: CloudFormationClient;
    tags?: Tag[];
}): Promise<boolean>;
/**
 * Updates an existing CloudFormation stack.
 *
 * This function sends an UpdateStackCommand to the AWS CloudFormation service to update an existing stack.
 * It includes the stack name, template body, and capabilities (IAM and named IAM).
 * The client request token is also provided to ensure idempotency.
 *
 * @param opts - The options object containing the stack name, stack definition, and hook token.
 * @param opts.name - The name of the stack to update.
 * @param opts.stack - The stack definition to be updated.
 * @param opts.hookToken - The hook token used for idempotency.
 * @returns A promise that resolves to true if the stack was updated, false if no updates were performed.
 * @throws Throws an error if the stack update fails.
 */
export declare function updateStack(opts: {
    name: string;
    stack: Stack;
    hookToken: string;
    stackOpts: {
        projectPK: string;
        environmentSK: string;
        deploymentSK: string;
        name: string;
    };
}): Promise<boolean>;
/**
 * Generates a client request token for CloudFormation operations.
 *
 * This function takes a hook token and converts it to a hexadecimal string,
 * then prepends "wf-" to it to create a unique client request token.
 *
 * @param hookToken - The hook token used for idempotency.
 * @param opts - The options object containing the project PK, environment SK, and deployment SK.
 * @returns A client request token in the format "wf-T{hexToken}-I{hexInfo}".
 */
export declare function clientRequestToken(hookToken: string, opts: {
    projectPK: string;
    environmentSK: string;
    deploymentSK: string;
    name: string;
}): string;
export declare function parseClientRequestToken(token: string): {
    hookToken: string;
    deploymentSK: string;
} | undefined;
/**
 * Represents a CloudFormation hook for stack status events.
 *
 * This type is used to define the expected shape of a CloudFormation hook,
 * which includes a status property indicating the current state of the stack.
 *
 * @property status - The status of the CloudFormation stack.
 */
export type CloudFormationHook = {
    step: string;
    status: CloudFormationStackStatusChangeEventStatus;
    log: {
        groupName: string;
        streamName: string;
    };
};
/**
 * Creates or updates a CloudFormation stack.
 *
 * This function first checks if the stack exists. If it doesn't, it creates the stack.
 * If it does exist, it updates the stack. The update operation is wrapped in a try-catch block
 * to handle cases where no updates are to be performed (e.g., due to identical templates).
 *
 * @param opts - The options object containing the stack name, stack definition, and client request token.
 * @param opts.name - The name of the stack to create or update.
 * @param opts.stack - The stack definition to be created or updated.
 * @param opts.clientRequestToken - The client request token used for idempotency.
 * @returns A promise that resolves to true if the stack was created or updated, false if no updates were performed.
 * @throws Throws an error if the stack creation or update fails.
 */
export declare function createOrUpdateStack(opts: {
    name: string;
    stack: Stack;
    clientRequestToken: string;
    stackOpts: {
        projectPK: string;
        environmentSK: string;
        deploymentSK: string;
        name: string;
    };
}): Promise<boolean>;
export declare function stackToJSONString(stack: Stack): Promise<string>;
export declare function stackName(stackId: string): string;
interface StackTags {
    project?: string;
    projectId?: string;
    environment?: string;
    deploymentNumber?: string;
    name?: string;
}
export declare function getStackTags(event: CloudFormationStatusChangeEvent, opts?: {
    client?: CloudFormationClient;
}): Promise<StackTags>;
export {};
