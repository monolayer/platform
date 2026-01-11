import { EC2Client } from "@aws-sdk/client-ec2";
import type Address from "ipaddr.js";
export declare function availabilityZonesNames(opts?: {
    client?: EC2Client;
}): Promise<(string | undefined)[]>;
export declare function nextAvailableCidrBlock(exclude?: [Address.IPv4 | Address.IPv6, number]): Promise<string>;
export declare function nextAvailableCidrBlocks({ firstOctet, count, client }: {
    firstOctet?: number;
    count?: number;
    client?: EC2Client;
}): Promise<string[]>;
