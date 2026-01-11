import type { Deployment, Environment, Project } from "../../../../packages/db/src/dto";
import type { DeployWebHookSchema } from "../../../../packages/infra-workflows/lib/deploy-webhook-schema";
export type DeploymentOpts = {
    next: DeployWebHookSchema;
    bootstrap: {
        project: boolean;
        environment: boolean;
    };
    project: Project;
    environment: Environment;
    deployment: Deployment;
};
/**
 * Orchestrates the deployment of an application environment.
 *
 * This function is a workflow that uses the `"use workflow"` directive from the [Workflow Devkit](https://useworkflow.dev).
 * It handles the entire deployment lifecycle, including associating the deployment with a run, bootstrapping resources,
 * building the code, and launching the necessary CloudFormation stacks.
 *
 * @param opts - The deployment options containing project, environment, and deployment details. See {@link DeploymentOpts}.
 */
export declare function deploy(opts: DeploymentOpts): Promise<void>;
export declare const filename: string;
