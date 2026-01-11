export declare function deploymentWorkloads(parsedWorkloads: any): DeploymentWorkloads;
export declare function statefulWorkloadsDiff(current: DeploymentWorkloads, next: DeploymentWorkloads): {
    buckets: boolean;
    postgres: boolean;
    redis: boolean;
};
export declare function workloadData(workloads: any, kind: "Bucket" | "PostgresDatabase" | "Redis" | "Task" | "BeforeRollout" | "AfterRollout" | "Bootstrap"): WorkloadData[];
export interface DeploymentWorkloads {
    crons: CronData[];
    tasks: WorkloadData[];
    postgres: WorkloadData[];
    buckets: BucketData[];
    redis: WorkloadData[];
    beforeRollout: WorkloadData[];
    afterRollout: WorkloadData[];
    bootstrap: WorkloadData[];
}
interface WorkloadData {
    id: string;
}
interface BucketData {
    id: string;
}
interface CronData {
    id: string;
    schedule: string;
}
interface LifecycleWorkload {
    id: string;
    script: string;
}
export declare function lifecycleWorkloads(workloads: any): Record<"AfterRollout" | "BeforeRollout" | "Bootstrap", LifecycleWorkload[]>;
export declare function byIdASC(a: LifecycleWorkload, b: LifecycleWorkload): number;
export {};
