/**
 * Options for deploying an app environment.
 *
 * This type defines the structure of the options object used in the {@link deployAppEnvironment} function.
 * It includes properties for project and environment identifiers, deployment numbers, workloads,
 * and other relevant information.
 *
 * @property projectId - The ID of the project being deployed.
 * @property environmentName - The name of the environment being deployed.
 * @property projectName - The name of the project being deployed.
 * @property deploymentNumber - The number of the deployment.
 * @property previousDeploymentNumber - The number of the previous deployment.
 * @property workloads - A string representing the workloads being deployed.
 * @property production - A boolean indicating whether the deployment is for production.
 * @property bootstrap - A boolean indicating whether the deployment is for bootstrap.
 * @property next - An object containing additional deployment information.
 * @property next.commitDate - The date of the commit being deployed.
 * @property next.commitSHA - The SHA of the commit being deployed.
 * @property next.deploymentNumber - The number of the deployment.
 * @property next.environment - The name of the environment being deployed.
 * @property next.deploymentProject - The name of the project being deployed.
 * @property next.workloads - A string representing the workloads being deployed.
 * @property next.branchName - The name of the branch being deployed.
 * @property next.bootstrap - A boolean indicating whether the deployment is for bootstrap.
 * @property next.afterRollout - A boolean indicating whether the deployment is for after rollout.
 * @property next.beforeRollout - A boolean indicating whether the deployment is for before rollout.
 * @property buildEnvVars - An array of objects representing environment variables for the build process.
 * @property buildEnvVars.parameterName - The name of the parameter.
 * @property buildEnvVars.name - The name of the environment variable.
 * @property buildEnvVars.value - The value of the environment variable.
 */
export type DeployOpts = {
    projectId: string;
    environmentName: string;
    projectName: string;
    deploymentNumber: string;
    previousDeploymentNumber: string;
    workloads: string;
    production: boolean;
    bootstrap: boolean;
    next: {
        commitDate: string;
        commitSHA: string;
        deploymentNumber: string;
        environment: string;
        deploymentProject: string;
        workloads: string;
        branchName: string;
        bootstrap?: boolean;
        afterRollout?: boolean;
        beforeRollout?: boolean;
    };
    buildEnvVars: {
        parameterName: string;
        name: string;
        value: string;
    }[];
};
