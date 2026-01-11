import { Stack } from "@awboost/cfn-template-builder/stack";
export declare function logStreamsStack(opts: LogStreamOpts): Stack;
export declare function logStreamsStackString(opts: LogStreamOpts): Promise<string>;
export interface LogStreamOpts {
    projectName: string;
    environment: string;
    deploymentNumber: string;
    retentionInDays?: 1 | 3 | 5 | 7 | 14 | 30 | 60 | 90 | 120 | 150 | 180 | 365 | 400 | 545 | 731 | 1096 | 1827 | 2192 | 2557 | 2922 | 3288 | 3653;
    production?: boolean;
}
