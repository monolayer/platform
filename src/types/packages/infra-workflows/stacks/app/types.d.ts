import type { FormattedProject } from "../../../db/src/entities";
import type { BlueprintContext } from "../types";
export interface AppStackContext extends BlueprintContext {
    sourceVersion: string;
    workloads: string;
    initial: boolean;
    project: FormattedProject;
    buildEnvVars: {
        parameterName: string;
        name: string;
        value: string;
    }[];
}
export interface AppOptions {
    cpu: string;
    memory: string;
    cpuArchitecture: string;
    operatingSystemFamily: string;
    containerPort: number;
    hostPort: number;
}
export interface EnvVar {
    Name: string;
    Value: string;
}
export interface ExportCronData {
    type: string;
    id: string;
    schedule: string;
    file: string;
}
export interface DatabasesData {
    type: string;
    id: string;
}
