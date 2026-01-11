import type { EC2RouteTable } from "@awboost/cfn-resource-types/AWS-EC2-RouteTable";
import type { EC2SubnetAttributes } from "@awboost/cfn-resource-types/AWS-EC2-Subnet";
import type { EC2VPCAttributes } from "@awboost/cfn-resource-types/AWS-EC2-VPC";
import type { VPCOpts } from ".";
import { Stack, type ResourceInstance } from "../types";
export declare function nat(stack: Stack, vpc: ResourceInstance<EC2VPCAttributes>, vpcOpts: VPCOpts, publicSubnet1: ResourceInstance<EC2SubnetAttributes>, privateRouteTables: EC2RouteTable[]): Promise<void>;
