import { Parameter } from "../types";
import type { EnvVar } from "./types";
export declare function deploymentEnvVars(opts: {
    parsedWorkloads: any;
    projectName: string;
    environment: string;
}): {
    envVars: EnvVar[];
    parameters: Parameter[];
};
