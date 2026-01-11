import type { IAMRole } from "@awboost/cfn-resource-types/AWS-IAM-Role";
import { LambdaFunction } from "@awboost/cfn-resource-types/AWS-Lambda-Function";
import type { ParameterInstance } from "../../types";
export declare function initialLambdaFn(opts: {
    role: IAMRole;
    projectName: string;
    environment: string;
    appRegistryParameter: ParameterInstance;
    sourceVersion: string;
    platformBucketParameter: ParameterInstance;
}): LambdaFunction;
