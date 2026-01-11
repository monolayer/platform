export type ParsedToken = {
    stack: string;
    project: string;
    environment: string;
    deployment: string;
};
export type StackToken = "VPC" | "LBEDGE" | "APPBOOTSTRAP" | "APP" | "LOGS" | "BUCKETS" | "POSTGRES" | "REDIS" | "LIFECYCLE" | "ASSETS" | "ECR";
/**
 * Parses strings in the format:
 *   <Name>-P{project-name-with-dashes}-E{environment-name-with-dashes}-D{number}[-optionalSuffix]
 *
 * Where:
 *  - Name is one of: VPC, LBEDGE, APP, LOGS, BUCKETS, POSTGRES, REDIS, LIFECYCLE, ECR, ASSETS(case sensitive)
 *  - The project portion starts with "P"
 *  - The environment portion starts with "E"
 *  - The deployment portion starts with "D" followed by one or more digits.
 *
 * If the string does not match the expected format, returns undefined.
 */
export declare function parseToken(input: string): ParsedToken | undefined;
