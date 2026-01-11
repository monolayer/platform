import type { DeployOpts } from "../../lib/deploy-opts";
export type LifecycleTasks = "bootstrap" | "beforeRollout" | "afterRollout";
export declare function lifecycleTask(opts: DeployOpts, task: LifecycleTasks, token: string): Promise<boolean>;
