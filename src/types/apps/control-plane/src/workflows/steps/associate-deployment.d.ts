import type { DeploymentOpts } from "../../workflows/deploy-app-environment";
export declare function associateDeploymentWithRun(opts: DeploymentOpts, runId: string): Promise<{
    buckets: boolean;
    postgres: boolean;
    redis: boolean;
}>;
