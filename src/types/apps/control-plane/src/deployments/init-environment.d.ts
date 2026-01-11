export declare function initEnviroment(projectId: string, projectName: string, environment: string, branchName: string): Promise<{
    name: string;
    availabilityZoneNames: string[];
    cidrBlock: string;
    currentDeployment: string;
}>;
export declare function initEnviromentV2(opts: {
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
}): Promise<{
    name: string;
    availabilityZoneNames: string[];
    cidrBlock: string;
    currentDeployment: string;
}>;
