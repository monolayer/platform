import type Address from "ipaddr.js";
export declare function nextAvailableCidrBlock(exclude?: [Address.IPv4 | Address.IPv6, number]): Promise<string>;
export declare function nextAvailableCidrBlocks({ firstOctet, count }: {
    count?: number | undefined;
    firstOctet?: number | undefined;
}): Promise<string[]>;
