import { type FormattedProject } from "../../db/src/entities";
export declare function buildEnvironmentVariables(opts: {
    project: FormattedProject;
    environmentName: string;
}): {
    name: string;
    value: string;
}[];
export declare function storeEnvVarsInParameterStore(opts: {
    project: FormattedProject;
    environmentName: string;
    deploymentNumber: string;
    contextId: string;
}): Promise<{
    name: string;
    value: string;
    parameterName: string;
}[]>;
declare const internalEnviroments: {
    Production: string;
    Preview: string;
    "All Environments": string;
};
export declare function environmentEnvVars(opts: {
    project: FormattedProject;
    environmentName: string;
}): Promise<{
    Name: string;
    Value: string;
}[]>;
export declare function environmentVariablesForEnvironment(opts: {
    project: FormattedProject;
    environmentName: string;
}): Promise<{
    environment: string;
    name: string;
    updatedAt: string;
    value: string;
}[]>;
export declare function environmentVariables(project: FormattedProject, kind: keyof typeof internalEnviroments & string): {
    environment: string;
    name: string;
    updatedAt: string;
    value: string;
}[];
export {};
