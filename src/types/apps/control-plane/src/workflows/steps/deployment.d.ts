import type { DeploymentOpts } from "../../workflows/deploy-app-environment";
export declare function markDeploymentAsFailed(opts: DeploymentOpts): Promise<void>;
export declare function markDeploymentAsSuccess(opts: DeploymentOpts): Promise<void>;
export declare function associateDeploymentWithRun(opts: DeploymentOpts, runId: string): Promise<void>;
