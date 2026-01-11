export type EnvironmentOps = {
    projectName: string;
};
declare function environment(name: string, opts: EnvironmentOps): string;
declare function projectUnique(name: string, opts: {
    projectName: string;
}): string;
export type UniqueOpts = {
    projectName: string;
    environment: string;
};
declare function unique(name: string, opts: UniqueOpts): string;
export type WorkloadKind = "app" | "postgres" | "cron" | "task" | "redis" | "mysql" | "bucket";
export type WorkloadIdOpts = {
    projectName: string;
    environmentName: string;
    kind: "workload";
};
declare function workload(name: string, opts: WorkloadIdOpts): string;
export type SfnExecutionOpts = {
    projectId: string;
    environmentName: string;
};
declare function sfnExecution(sfnArn: string, opts: SfnExecutionOpts): string;
export type CloudFrontOriginAccessControlOpts = {
    projectName: string;
    environment: string;
};
declare function cloudFrontOriginAccessControl(opts: CloudFrontOriginAccessControlOpts): string;
declare function cloudFrontAssetsOriginAccessControl(opts: CloudFrontOriginAccessControlOpts): string;
export declare function generateId(value: string, length?: number): string;
export declare const IdGenerator: {
    generateId: typeof generateId;
    projectUnique: typeof projectUnique;
    unique: typeof unique;
    environment: typeof environment;
    workload: typeof workload;
    sfnExecution: typeof sfnExecution;
    cloudFrontOriginAccessControl: typeof cloudFrontOriginAccessControl;
    cloudFrontAssetsOriginAccessControl: typeof cloudFrontAssetsOriginAccessControl;
};
export {};
