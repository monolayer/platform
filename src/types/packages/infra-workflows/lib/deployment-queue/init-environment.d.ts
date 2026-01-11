export declare function initEnviroment(opts: {
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
