import z from "zod";
import { Environment } from "../../db/src/dto";
import { type FormattedProject } from "../../db/src/entities";
export declare const deployWebhookSchema: z.ZodObject<{
    buildDetails: z.ZodObject<{
        deploymentProjectId: z.ZodString;
        deploymentProject: z.ZodString;
        deploymentNumber: z.ZodString;
        deploymentTrigger: z.ZodString;
        commitSHA: z.ZodString;
        commitDate: z.ZodString;
        commitMessage: z.ZodString;
        commitAuthor: z.ZodString;
        webhookBuildId: z.ZodString;
    }, z.core.$strip>;
    workloads: z.ZodString;
}, z.core.$strip>;
export type DeployWebHookSchema = z.infer<typeof deployWebhookSchema>;
export declare function hydratedSchema(schema: DeployWebHookSchema): Promise<{
    next: DeployWebHookSchema;
    project: FormattedProject;
    environment: Environment;
}>;
