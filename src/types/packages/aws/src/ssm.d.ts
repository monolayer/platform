import { ParameterType, SSMClient, type Parameter, type PutParameterCommandInput } from "@aws-sdk/client-ssm";
export declare const ssmClient: SSMClient;
export declare function fetchSSMParameters(path: string, opts?: {
    client?: SSMClient;
    recursive?: boolean;
}): Promise<Parameter[]>;
export declare function fetchEnvironmentVariables(projectId: string, opts: {
    client?: SSMClient;
}): Promise<Parameter[]>;
export type CreateEnvironmentVariableParameterResponse = {
    success: true;
    parameter: Parameter;
} | {
    success: false;
    message: string;
};
export declare function putParameter(input: PutParameterCommandInput, opts?: {
    client?: SSMClient;
}): Promise<{
    success: boolean;
    parameter: {
        Name: string | undefined;
        Value: string | undefined;
        LastModifiedDate: Date;
        Type: ParameterType | undefined;
        DataType: string | undefined;
    };
    message?: undefined;
} | {
    parameter?: undefined;
    success: boolean;
    message: any;
}>;
export declare function ssmParameterNameforEnvVar(opts: {
    projectId: string;
    environment: string;
    deploymentNumber: string;
    contextId: string;
    name: string;
}): string;
export declare function createEnvironmentVariableParameter(opts: {
    projectId: string;
    environment: string;
    deploymentNumber: string;
    contextId: string;
    key: string;
    value: string;
    client?: SSMClient;
}): Promise<CreateEnvironmentVariableParameterResponse>;
export type DeleteEnvironmentVariableParameterResponse = {
    success: true;
    parameter: Parameter;
} | {
    success: false;
    message: string;
};
export declare function deleteEnvironmentVariableParameter(opts: {
    name: string;
    client?: SSMClient;
}): Promise<DeleteEnvironmentVariableParameterResponse>;
export declare function getParameters(parameters: string[], opts?: {
    client?: SSMClient;
}): Promise<Parameter[] | undefined>;
export declare function getParameter(parameterName: string): Promise<string | undefined>;
export declare function parameterName(parameter: Parameter): string;
export declare function parameterEnvironment(parameter: Parameter): string;
export declare function byNameASC(a: Parameter, b: Parameter): number;
export declare function byNameDESC(a: Parameter, b: Parameter): number;
export declare function byLasModifiedDateASC(a: Parameter, b: Parameter): number;
export declare function byLasModifiedDateDESC(a: Parameter, b: Parameter): number;
