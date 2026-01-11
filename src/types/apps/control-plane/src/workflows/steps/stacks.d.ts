import type { DeployOpts } from "../../lib/deploy-opts";
import type { DeploymentOpts } from "../deploy-app-environment";
export declare function appStack(opts: DeployOpts, hookToken: string, deploymentOpts: DeploymentOpts): Promise<boolean>;
export declare function assetsStack(opts: {
    projectName: string;
    environmentName: string;
    deploymentNumber: string;
}, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function BootstrapAppStack(opts: DeployOpts, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function bucketsStack(opts: DeployOpts, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function ECRStack(opts: {
    projectName: string;
    environmentName: string;
    deploymentNumber: string;
    production: boolean;
}, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function edgeStack(opts: DeployOpts, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function LifeCycleStack(opts: DeployOpts, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function logStreamsStack(opts: {
    projectName: string;
    environmentName: string;
    deploymentNumber: string;
    production: boolean;
}, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function PostgresStack(opts: DeployOpts, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function RedisStack(opts: DeployOpts, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare function VPCStack(opts: {
    projectName: string;
    environmentName: string;
    deploymentNumber: string;
    projectId: string;
    next: {
        commitDate: string;
        commitSHA: string;
        deploymentNumber: string;
        environment: string;
        deploymentProject: string;
        workloads: string;
        branchName: string;
    };
}, deploymentOpts: DeploymentOpts, hookToken: string): Promise<boolean>;
export declare const stacks: {
    logStreams: typeof logStreamsStack;
    assets: typeof assetsStack;
    ecr: typeof ECRStack;
    vpc: typeof VPCStack;
    edge: typeof edgeStack;
    buckets: typeof bucketsStack;
    bootstrapApp: typeof BootstrapAppStack;
    redis: typeof RedisStack;
    postgres: typeof PostgresStack;
    lifecycle: typeof LifeCycleStack;
};
