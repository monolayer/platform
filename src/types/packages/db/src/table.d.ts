import { Table } from "dynamodb-toolbox";
export declare const MonolayerCloudTable: Table<{
    name: "PK";
    type: "string";
}, {
    name: "SK";
    type: "string";
}, {
    "GSI1-index": {
        type: "global";
        partitionKey: {
            name: "GSI1";
            type: "string";
        };
    };
}, "_et">;
export declare function randomKSUID(): string;
