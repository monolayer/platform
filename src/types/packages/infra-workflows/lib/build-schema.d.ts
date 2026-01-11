import { z } from "zod/v3";
export declare const buildSchema: z.ZodObject<{
    deploymentProjectId: z.ZodString;
    deploymentProject: z.ZodString;
    deploymentNumber: z.ZodString;
    deploymentTrigger: z.ZodString;
    commitSHA: z.ZodString;
    commitDate: z.ZodString;
    commitMessage: z.ZodString;
    commitAuthor: z.ZodString;
    webhookBuildId: z.ZodString;
    workloads: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deploymentProjectId: string;
    deploymentProject: string;
    deploymentNumber: string;
    deploymentTrigger: string;
    commitSHA: string;
    commitDate: string;
    commitMessage: string;
    commitAuthor: string;
    webhookBuildId: string;
    workloads: string;
}, {
    deploymentProjectId: string;
    deploymentProject: string;
    deploymentNumber: string;
    deploymentTrigger: string;
    commitSHA: string;
    commitDate: string;
    commitMessage: string;
    commitAuthor: string;
    webhookBuildId: string;
    workloads: string;
}>;
export type BuildDetails = z.output<typeof buildSchema>;
export declare function buildDetailsfronEnvironment(): {
    deploymentProjectId: string;
    deploymentProject: string;
    deploymentNumber: string;
    deploymentTrigger: string;
    commitSHA: string;
    commitDate: string;
    commitMessage: string;
    commitAuthor: string;
    webhookBuildId: string;
    workloads: string;
};
