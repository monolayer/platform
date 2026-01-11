import type { DeploymentOpts } from "../../workflows/deploy-app-environment";
export declare function codeBuild(opts: DeploymentOpts, token: string): Promise<boolean>;
