import { Stack } from "../types";
export interface VPCOpts {
    cidrBlock: string;
    projectName: string;
    environment: string;
    availabilityZones: [string, string];
    production: boolean;
}
export declare function vpcStack(opts: VPCOpts): Promise<Stack>;
export declare function vpcStackString(opts: VPCOpts): Promise<string>;
