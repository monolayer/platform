import { z } from "zod/v3";
export type Artifact = z.infer<typeof Artifact>;
export declare const Artifact: z.ZodObject<{
    location: z.ZodString;
    md5sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    sha256sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
}, "strip", z.ZodTypeAny, {
    location: string;
    md5sum?: string | undefined;
    sha256sum?: string | undefined;
}, {
    location: string;
    md5sum?: string | undefined;
    sha256sum?: string | undefined;
}>;
export type Cache = z.infer<typeof Cache>;
export declare const Cache: z.ZodObject<{
    location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location?: string | undefined;
    type: string;
}, {
    location?: string | undefined;
    type: string;
}>;
export type EnvironmentItem = z.infer<typeof EnvironmentItem>;
export declare const EnvironmentItem: z.ZodUnion<[z.ZodObject<{
    name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    type: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | null | undefined;
    type?: string | null | undefined;
    value?: string | null | undefined;
}, {
    name?: string | null | undefined;
    type?: string | null | undefined;
    value?: string | null | undefined;
}>, z.ZodNull]>;
export type Environment = z.infer<typeof Environment>;
export declare const Environment: z.ZodObject<{
    "compute-type": z.ZodString;
    "environment-variables": z.ZodArray<z.ZodUnion<[z.ZodObject<{
        name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | null | undefined;
        type?: string | null | undefined;
        value?: string | null | undefined;
    }, {
        name?: string | null | undefined;
        type?: string | null | undefined;
        value?: string | null | undefined;
    }>, z.ZodNull]>, "many">;
    image: z.ZodString;
    "image-pull-credentials-type": z.ZodString;
    "privileged-mode": z.ZodBoolean;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    "compute-type": string;
    "environment-variables": ({
        name?: string | null | undefined;
        type?: string | null | undefined;
        value?: string | null | undefined;
    } | null)[];
    image: string;
    "image-pull-credentials-type": string;
    "privileged-mode": boolean;
    type: string;
}, {
    "compute-type": string;
    "environment-variables": ({
        name?: string | null | undefined;
        type?: string | null | undefined;
        value?: string | null | undefined;
    } | null)[];
    image: string;
    "image-pull-credentials-type": string;
    "privileged-mode": boolean;
    type: string;
}>;
export type Logs = z.infer<typeof Logs>;
export declare const Logs: z.ZodObject<{
    "deep-link": z.ZodString;
    "group-name": z.ZodString;
    "stream-name": z.ZodString;
}, "strip", z.ZodTypeAny, {
    "deep-link": string;
    "group-name": string;
    "stream-name": string;
}, {
    "deep-link": string;
    "group-name": string;
    "stream-name": string;
}>;
export type Network_interface = z.infer<typeof Network_interface>;
export declare const Network_interface: z.ZodObject<{
    "eni-id": z.ZodOptional<z.ZodString>;
    "subnet-id": z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    "eni-id"?: string | undefined;
    "subnet-id"?: string | undefined;
}, {
    "eni-id"?: string | undefined;
    "subnet-id"?: string | undefined;
}>;
export type Auth = z.infer<typeof Auth>;
export declare const Auth: z.ZodObject<{
    type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: string | undefined;
}, {
    type?: string | undefined;
}>;
export type Source = z.infer<typeof Source>;
export declare const Source: z.ZodObject<{
    auth: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        type: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type?: string | undefined;
    }, {
        type?: string | undefined;
    }>, z.ZodUndefined]>>;
    buildspec: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    auth?: {
        type?: string | undefined;
    } | undefined;
    buildspec?: string | undefined;
    location?: string | undefined;
    type: string;
}, {
    auth?: {
        type?: string | undefined;
    } | undefined;
    buildspec?: string | undefined;
    location?: string | undefined;
    type: string;
}>;
export type Vpc_configItem = z.infer<typeof Vpc_configItem>;
export declare const Vpc_configItem: z.ZodObject<{
    "build-fleet-az": z.ZodString;
    "customer-az": z.ZodString;
    "subnet-id": z.ZodString;
}, "strip", z.ZodTypeAny, {
    "build-fleet-az": string;
    "customer-az": string;
    "subnet-id": string;
}, {
    "build-fleet-az": string;
    "customer-az": string;
    "subnet-id": string;
}>;
export type Vpc_config = z.infer<typeof Vpc_config>;
export declare const Vpc_config: z.ZodObject<{
    "security-group-ids": z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">;
    subnets: z.ZodArray<z.ZodObject<{
        "build-fleet-az": z.ZodString;
        "customer-az": z.ZodString;
        "subnet-id": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "build-fleet-az": string;
        "customer-az": string;
        "subnet-id": string;
    }, {
        "build-fleet-az": string;
        "customer-az": string;
        "subnet-id": string;
    }>, "many">;
    "vpc-id": z.ZodString;
}, "strip", z.ZodTypeAny, {
    "security-group-ids": (string | null)[];
    subnets: {
        "build-fleet-az": string;
        "customer-az": string;
        "subnet-id": string;
    }[];
    "vpc-id": string;
}, {
    "security-group-ids": (string | null)[];
    subnets: {
        "build-fleet-az": string;
        "customer-az": string;
        "subnet-id": string;
    }[];
    "vpc-id": string;
}>;
export type Additional_informationItem = z.infer<typeof Additional_informationItem>;
export declare const Additional_informationItem: z.ZodObject<{
    "duration-in-seconds": z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>>;
    "end-time": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    "phase-context": z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">, z.ZodUndefined]>>;
    "phase-status": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    "phase-type": z.ZodString;
    "start-time": z.ZodString;
}, "strip", z.ZodTypeAny, {
    "duration-in-seconds"?: number | undefined;
    "end-time"?: string | undefined;
    "phase-context"?: (string | null)[] | undefined;
    "phase-status"?: string | undefined;
    "phase-type": string;
    "start-time": string;
}, {
    "duration-in-seconds"?: number | undefined;
    "end-time"?: string | undefined;
    "phase-context"?: (string | null)[] | undefined;
    "phase-status"?: string | undefined;
    "phase-type": string;
    "start-time": string;
}>;
export type Additional_information = z.infer<typeof Additional_information>;
export declare const Additional_information: z.ZodObject<{
    artifact: z.ZodObject<{
        location: z.ZodString;
        md5sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        sha256sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    }, "strip", z.ZodTypeAny, {
        location: string;
        md5sum?: string | undefined;
        sha256sum?: string | undefined;
    }, {
        location: string;
        md5sum?: string | undefined;
        sha256sum?: string | undefined;
    }>;
    cache: z.ZodObject<{
        location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        location?: string | undefined;
        type: string;
    }, {
        location?: string | undefined;
        type: string;
    }>;
    environment: z.ZodObject<{
        "compute-type": z.ZodString;
        "environment-variables": z.ZodArray<z.ZodUnion<[z.ZodObject<{
            name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | null | undefined;
            type?: string | null | undefined;
            value?: string | null | undefined;
        }, {
            name?: string | null | undefined;
            type?: string | null | undefined;
            value?: string | null | undefined;
        }>, z.ZodNull]>, "many">;
        image: z.ZodString;
        "image-pull-credentials-type": z.ZodString;
        "privileged-mode": z.ZodBoolean;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "compute-type": string;
        "environment-variables": ({
            name?: string | null | undefined;
            type?: string | null | undefined;
            value?: string | null | undefined;
        } | null)[];
        image: string;
        "image-pull-credentials-type": string;
        "privileged-mode": boolean;
        type: string;
    }, {
        "compute-type": string;
        "environment-variables": ({
            name?: string | null | undefined;
            type?: string | null | undefined;
            value?: string | null | undefined;
        } | null)[];
        image: string;
        "image-pull-credentials-type": string;
        "privileged-mode": boolean;
        type: string;
    }>;
    logs: z.ZodObject<{
        "deep-link": z.ZodString;
        "group-name": z.ZodString;
        "stream-name": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "deep-link": string;
        "group-name": string;
        "stream-name": string;
    }, {
        "deep-link": string;
        "group-name": string;
        "stream-name": string;
    }>;
    "network-interface": z.ZodObject<{
        "eni-id": z.ZodOptional<z.ZodString>;
        "subnet-id": z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        "eni-id"?: string | undefined;
        "subnet-id"?: string | undefined;
    }, {
        "eni-id"?: string | undefined;
        "subnet-id"?: string | undefined;
    }>;
    source: z.ZodObject<{
        auth: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
        }, {
            type?: string | undefined;
        }>, z.ZodUndefined]>>;
        buildspec: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        auth?: {
            type?: string | undefined;
        } | undefined;
        buildspec?: string | undefined;
        location?: string | undefined;
        type: string;
    }, {
        auth?: {
            type?: string | undefined;
        } | undefined;
        buildspec?: string | undefined;
        location?: string | undefined;
        type: string;
    }>;
    "vpc-config": z.ZodObject<{
        "security-group-ids": z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">;
        subnets: z.ZodArray<z.ZodObject<{
            "build-fleet-az": z.ZodString;
            "customer-az": z.ZodString;
            "subnet-id": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "build-fleet-az": string;
            "customer-az": string;
            "subnet-id": string;
        }, {
            "build-fleet-az": string;
            "customer-az": string;
            "subnet-id": string;
        }>, "many">;
        "vpc-id": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "security-group-ids": (string | null)[];
        subnets: {
            "build-fleet-az": string;
            "customer-az": string;
            "subnet-id": string;
        }[];
        "vpc-id": string;
    }, {
        "security-group-ids": (string | null)[];
        subnets: {
            "build-fleet-az": string;
            "customer-az": string;
            "subnet-id": string;
        }[];
        "vpc-id": string;
    }>;
    "build-complete": z.ZodBoolean;
    "build-start-time": z.ZodString;
    initiator: z.ZodString;
    phases: z.ZodArray<z.ZodObject<{
        "duration-in-seconds": z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>>;
        "end-time": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        "phase-context": z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">, z.ZodUndefined]>>;
        "phase-status": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        "phase-type": z.ZodString;
        "start-time": z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "duration-in-seconds"?: number | undefined;
        "end-time"?: string | undefined;
        "phase-context"?: (string | null)[] | undefined;
        "phase-status"?: string | undefined;
        "phase-type": string;
        "start-time": string;
    }, {
        "duration-in-seconds"?: number | undefined;
        "end-time"?: string | undefined;
        "phase-context"?: (string | null)[] | undefined;
        "phase-status"?: string | undefined;
        "phase-type": string;
        "start-time": string;
    }>, "many">;
    "queued-timeout-in-minutes": z.ZodNumber;
    "source-version": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
    "timeout-in-minutes": z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    artifact: {
        location: string;
        md5sum?: string | undefined;
        sha256sum?: string | undefined;
    };
    cache: {
        location?: string | undefined;
        type: string;
    };
    environment: {
        "compute-type": string;
        "environment-variables": ({
            name?: string | null | undefined;
            type?: string | null | undefined;
            value?: string | null | undefined;
        } | null)[];
        image: string;
        "image-pull-credentials-type": string;
        "privileged-mode": boolean;
        type: string;
    };
    logs: {
        "deep-link": string;
        "group-name": string;
        "stream-name": string;
    };
    "network-interface": {
        "eni-id"?: string | undefined;
        "subnet-id"?: string | undefined;
    };
    source: {
        auth?: {
            type?: string | undefined;
        } | undefined;
        buildspec?: string | undefined;
        location?: string | undefined;
        type: string;
    };
    "vpc-config": {
        "security-group-ids": (string | null)[];
        subnets: {
            "build-fleet-az": string;
            "customer-az": string;
            "subnet-id": string;
        }[];
        "vpc-id": string;
    };
    "build-complete": boolean;
    "build-start-time": string;
    initiator: string;
    phases: {
        "duration-in-seconds"?: number | undefined;
        "end-time"?: string | undefined;
        "phase-context"?: (string | null)[] | undefined;
        "phase-status"?: string | undefined;
        "phase-type": string;
        "start-time": string;
    }[];
    "queued-timeout-in-minutes": number;
    "source-version"?: string | undefined;
    "timeout-in-minutes": number;
}, {
    artifact: {
        location: string;
        md5sum?: string | undefined;
        sha256sum?: string | undefined;
    };
    cache: {
        location?: string | undefined;
        type: string;
    };
    environment: {
        "compute-type": string;
        "environment-variables": ({
            name?: string | null | undefined;
            type?: string | null | undefined;
            value?: string | null | undefined;
        } | null)[];
        image: string;
        "image-pull-credentials-type": string;
        "privileged-mode": boolean;
        type: string;
    };
    logs: {
        "deep-link": string;
        "group-name": string;
        "stream-name": string;
    };
    "network-interface": {
        "eni-id"?: string | undefined;
        "subnet-id"?: string | undefined;
    };
    source: {
        auth?: {
            type?: string | undefined;
        } | undefined;
        buildspec?: string | undefined;
        location?: string | undefined;
        type: string;
    };
    "vpc-config": {
        "security-group-ids": (string | null)[];
        subnets: {
            "build-fleet-az": string;
            "customer-az": string;
            "subnet-id": string;
        }[];
        "vpc-id": string;
    };
    "build-complete": boolean;
    "build-start-time": string;
    initiator: string;
    phases: {
        "duration-in-seconds"?: number | undefined;
        "end-time"?: string | undefined;
        "phase-context"?: (string | null)[] | undefined;
        "phase-status"?: string | undefined;
        "phase-type": string;
        "start-time": string;
    }[];
    "queued-timeout-in-minutes": number;
    "source-version"?: string | undefined;
    "timeout-in-minutes": number;
}>;
export type CodeBuildBuildPhaseChange = z.infer<typeof CodeBuildBuildPhaseChange>;
export declare const CodeBuildBuildPhaseChange: z.ZodObject<{
    "additional-information": z.ZodObject<{
        artifact: z.ZodObject<{
            location: z.ZodString;
            md5sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            sha256sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        }, "strip", z.ZodTypeAny, {
            location: string;
            md5sum?: string | undefined;
            sha256sum?: string | undefined;
        }, {
            location: string;
            md5sum?: string | undefined;
            sha256sum?: string | undefined;
        }>;
        cache: z.ZodObject<{
            location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            location?: string | undefined;
            type: string;
        }, {
            location?: string | undefined;
            type: string;
        }>;
        environment: z.ZodObject<{
            "compute-type": z.ZodString;
            "environment-variables": z.ZodArray<z.ZodUnion<[z.ZodObject<{
                name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
                type: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            }, {
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            }>, z.ZodNull]>, "many">;
            image: z.ZodString;
            "image-pull-credentials-type": z.ZodString;
            "privileged-mode": z.ZodBoolean;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "compute-type": string;
            "environment-variables": ({
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            } | null)[];
            image: string;
            "image-pull-credentials-type": string;
            "privileged-mode": boolean;
            type: string;
        }, {
            "compute-type": string;
            "environment-variables": ({
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            } | null)[];
            image: string;
            "image-pull-credentials-type": string;
            "privileged-mode": boolean;
            type: string;
        }>;
        logs: z.ZodObject<{
            "deep-link": z.ZodString;
            "group-name": z.ZodString;
            "stream-name": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "deep-link": string;
            "group-name": string;
            "stream-name": string;
        }, {
            "deep-link": string;
            "group-name": string;
            "stream-name": string;
        }>;
        "network-interface": z.ZodObject<{
            "eni-id": z.ZodOptional<z.ZodString>;
            "subnet-id": z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            "eni-id"?: string | undefined;
            "subnet-id"?: string | undefined;
        }, {
            "eni-id"?: string | undefined;
            "subnet-id"?: string | undefined;
        }>;
        source: z.ZodObject<{
            auth: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
            }, {
                type?: string | undefined;
            }>, z.ZodUndefined]>>;
            buildspec: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            auth?: {
                type?: string | undefined;
            } | undefined;
            buildspec?: string | undefined;
            location?: string | undefined;
            type: string;
        }, {
            auth?: {
                type?: string | undefined;
            } | undefined;
            buildspec?: string | undefined;
            location?: string | undefined;
            type: string;
        }>;
        "vpc-config": z.ZodObject<{
            "security-group-ids": z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">;
            subnets: z.ZodArray<z.ZodObject<{
                "build-fleet-az": z.ZodString;
                "customer-az": z.ZodString;
                "subnet-id": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }, {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }>, "many">;
            "vpc-id": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "security-group-ids": (string | null)[];
            subnets: {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }[];
            "vpc-id": string;
        }, {
            "security-group-ids": (string | null)[];
            subnets: {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }[];
            "vpc-id": string;
        }>;
        "build-complete": z.ZodBoolean;
        "build-start-time": z.ZodString;
        initiator: z.ZodString;
        phases: z.ZodArray<z.ZodObject<{
            "duration-in-seconds": z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>>;
            "end-time": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            "phase-context": z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">, z.ZodUndefined]>>;
            "phase-status": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            "phase-type": z.ZodString;
            "start-time": z.ZodString;
        }, "strip", z.ZodTypeAny, {
            "duration-in-seconds"?: number | undefined;
            "end-time"?: string | undefined;
            "phase-context"?: (string | null)[] | undefined;
            "phase-status"?: string | undefined;
            "phase-type": string;
            "start-time": string;
        }, {
            "duration-in-seconds"?: number | undefined;
            "end-time"?: string | undefined;
            "phase-context"?: (string | null)[] | undefined;
            "phase-status"?: string | undefined;
            "phase-type": string;
            "start-time": string;
        }>, "many">;
        "queued-timeout-in-minutes": z.ZodNumber;
        "source-version": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
        "timeout-in-minutes": z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        artifact: {
            location: string;
            md5sum?: string | undefined;
            sha256sum?: string | undefined;
        };
        cache: {
            location?: string | undefined;
            type: string;
        };
        environment: {
            "compute-type": string;
            "environment-variables": ({
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            } | null)[];
            image: string;
            "image-pull-credentials-type": string;
            "privileged-mode": boolean;
            type: string;
        };
        logs: {
            "deep-link": string;
            "group-name": string;
            "stream-name": string;
        };
        "network-interface": {
            "eni-id"?: string | undefined;
            "subnet-id"?: string | undefined;
        };
        source: {
            auth?: {
                type?: string | undefined;
            } | undefined;
            buildspec?: string | undefined;
            location?: string | undefined;
            type: string;
        };
        "vpc-config": {
            "security-group-ids": (string | null)[];
            subnets: {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }[];
            "vpc-id": string;
        };
        "build-complete": boolean;
        "build-start-time": string;
        initiator: string;
        phases: {
            "duration-in-seconds"?: number | undefined;
            "end-time"?: string | undefined;
            "phase-context"?: (string | null)[] | undefined;
            "phase-status"?: string | undefined;
            "phase-type": string;
            "start-time": string;
        }[];
        "queued-timeout-in-minutes": number;
        "source-version"?: string | undefined;
        "timeout-in-minutes": number;
    }, {
        artifact: {
            location: string;
            md5sum?: string | undefined;
            sha256sum?: string | undefined;
        };
        cache: {
            location?: string | undefined;
            type: string;
        };
        environment: {
            "compute-type": string;
            "environment-variables": ({
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            } | null)[];
            image: string;
            "image-pull-credentials-type": string;
            "privileged-mode": boolean;
            type: string;
        };
        logs: {
            "deep-link": string;
            "group-name": string;
            "stream-name": string;
        };
        "network-interface": {
            "eni-id"?: string | undefined;
            "subnet-id"?: string | undefined;
        };
        source: {
            auth?: {
                type?: string | undefined;
            } | undefined;
            buildspec?: string | undefined;
            location?: string | undefined;
            type: string;
        };
        "vpc-config": {
            "security-group-ids": (string | null)[];
            subnets: {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }[];
            "vpc-id": string;
        };
        "build-complete": boolean;
        "build-start-time": string;
        initiator: string;
        phases: {
            "duration-in-seconds"?: number | undefined;
            "end-time"?: string | undefined;
            "phase-context"?: (string | null)[] | undefined;
            "phase-status"?: string | undefined;
            "phase-type": string;
            "start-time": string;
        }[];
        "queued-timeout-in-minutes": number;
        "source-version"?: string | undefined;
        "timeout-in-minutes": number;
    }>;
    "build-id": z.ZodString;
    "completed-phase": z.ZodString;
    "completed-phase-context": z.ZodString;
    "completed-phase-duration-seconds": z.ZodNumber;
    "completed-phase-end": z.ZodString;
    "completed-phase-start": z.ZodString;
    "completed-phase-status": z.ZodString;
    "project-name": z.ZodString;
    version: z.ZodString;
}, "strip", z.ZodTypeAny, {
    "additional-information": {
        artifact: {
            location: string;
            md5sum?: string | undefined;
            sha256sum?: string | undefined;
        };
        cache: {
            location?: string | undefined;
            type: string;
        };
        environment: {
            "compute-type": string;
            "environment-variables": ({
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            } | null)[];
            image: string;
            "image-pull-credentials-type": string;
            "privileged-mode": boolean;
            type: string;
        };
        logs: {
            "deep-link": string;
            "group-name": string;
            "stream-name": string;
        };
        "network-interface": {
            "eni-id"?: string | undefined;
            "subnet-id"?: string | undefined;
        };
        source: {
            auth?: {
                type?: string | undefined;
            } | undefined;
            buildspec?: string | undefined;
            location?: string | undefined;
            type: string;
        };
        "vpc-config": {
            "security-group-ids": (string | null)[];
            subnets: {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }[];
            "vpc-id": string;
        };
        "build-complete": boolean;
        "build-start-time": string;
        initiator: string;
        phases: {
            "duration-in-seconds"?: number | undefined;
            "end-time"?: string | undefined;
            "phase-context"?: (string | null)[] | undefined;
            "phase-status"?: string | undefined;
            "phase-type": string;
            "start-time": string;
        }[];
        "queued-timeout-in-minutes": number;
        "source-version"?: string | undefined;
        "timeout-in-minutes": number;
    };
    "build-id": string;
    "completed-phase": string;
    "completed-phase-context": string;
    "completed-phase-duration-seconds": number;
    "completed-phase-end": string;
    "completed-phase-start": string;
    "completed-phase-status": string;
    "project-name": string;
    version: string;
}, {
    "additional-information": {
        artifact: {
            location: string;
            md5sum?: string | undefined;
            sha256sum?: string | undefined;
        };
        cache: {
            location?: string | undefined;
            type: string;
        };
        environment: {
            "compute-type": string;
            "environment-variables": ({
                name?: string | null | undefined;
                type?: string | null | undefined;
                value?: string | null | undefined;
            } | null)[];
            image: string;
            "image-pull-credentials-type": string;
            "privileged-mode": boolean;
            type: string;
        };
        logs: {
            "deep-link": string;
            "group-name": string;
            "stream-name": string;
        };
        "network-interface": {
            "eni-id"?: string | undefined;
            "subnet-id"?: string | undefined;
        };
        source: {
            auth?: {
                type?: string | undefined;
            } | undefined;
            buildspec?: string | undefined;
            location?: string | undefined;
            type: string;
        };
        "vpc-config": {
            "security-group-ids": (string | null)[];
            subnets: {
                "build-fleet-az": string;
                "customer-az": string;
                "subnet-id": string;
            }[];
            "vpc-id": string;
        };
        "build-complete": boolean;
        "build-start-time": string;
        initiator: string;
        phases: {
            "duration-in-seconds"?: number | undefined;
            "end-time"?: string | undefined;
            "phase-context"?: (string | null)[] | undefined;
            "phase-status"?: string | undefined;
            "phase-type": string;
            "start-time": string;
        }[];
        "queued-timeout-in-minutes": number;
        "source-version"?: string | undefined;
        "timeout-in-minutes": number;
    };
    "build-id": string;
    "completed-phase": string;
    "completed-phase-context": string;
    "completed-phase-duration-seconds": number;
    "completed-phase-end": string;
    "completed-phase-start": string;
    "completed-phase-status": string;
    "project-name": string;
    version: string;
}>;
export type CodeBuildBuildPhaseChangeSchema = z.infer<typeof CodeBuildBuildPhaseChangeSchema>;
export declare const CodeBuildBuildPhaseChangeSchema: z.ZodObject<{
    detail: z.ZodObject<{
        "additional-information": z.ZodObject<{
            artifact: z.ZodObject<{
                location: z.ZodString;
                md5sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
                sha256sum: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            }, "strip", z.ZodTypeAny, {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            }, {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            }>;
            cache: z.ZodObject<{
                location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                location?: string | undefined;
                type: string;
            }, {
                location?: string | undefined;
                type: string;
            }>;
            environment: z.ZodObject<{
                "compute-type": z.ZodString;
                "environment-variables": z.ZodArray<z.ZodUnion<[z.ZodObject<{
                    name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
                    type: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
                    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
                }, "strip", z.ZodTypeAny, {
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                }, {
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                }>, z.ZodNull]>, "many">;
                image: z.ZodString;
                "image-pull-credentials-type": z.ZodString;
                "privileged-mode": z.ZodBoolean;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            }, {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            }>;
            logs: z.ZodObject<{
                "deep-link": z.ZodString;
                "group-name": z.ZodString;
                "stream-name": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            }, {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            }>;
            "network-interface": z.ZodObject<{
                "eni-id": z.ZodOptional<z.ZodString>;
                "subnet-id": z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            }, {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            }>;
            source: z.ZodObject<{
                auth: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                }, {
                    type?: string | undefined;
                }>, z.ZodUndefined]>>;
                buildspec: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
                location: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
                type: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            }, {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            }>;
            "vpc-config": z.ZodObject<{
                "security-group-ids": z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">;
                subnets: z.ZodArray<z.ZodObject<{
                    "build-fleet-az": z.ZodString;
                    "customer-az": z.ZodString;
                    "subnet-id": z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }, {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }>, "many">;
                "vpc-id": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            }, {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            }>;
            "build-complete": z.ZodBoolean;
            "build-start-time": z.ZodString;
            initiator: z.ZodString;
            phases: z.ZodArray<z.ZodObject<{
                "duration-in-seconds": z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>>;
                "end-time": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
                "phase-context": z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNull]>, "many">, z.ZodUndefined]>>;
                "phase-status": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
                "phase-type": z.ZodString;
                "start-time": z.ZodString;
            }, "strip", z.ZodTypeAny, {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }, {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }>, "many">;
            "queued-timeout-in-minutes": z.ZodNumber;
            "source-version": z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUndefined]>>;
            "timeout-in-minutes": z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            artifact: {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            };
            cache: {
                location?: string | undefined;
                type: string;
            };
            environment: {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            };
            logs: {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            };
            "network-interface": {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            };
            source: {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            };
            "vpc-config": {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            };
            "build-complete": boolean;
            "build-start-time": string;
            initiator: string;
            phases: {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }[];
            "queued-timeout-in-minutes": number;
            "source-version"?: string | undefined;
            "timeout-in-minutes": number;
        }, {
            artifact: {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            };
            cache: {
                location?: string | undefined;
                type: string;
            };
            environment: {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            };
            logs: {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            };
            "network-interface": {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            };
            source: {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            };
            "vpc-config": {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            };
            "build-complete": boolean;
            "build-start-time": string;
            initiator: string;
            phases: {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }[];
            "queued-timeout-in-minutes": number;
            "source-version"?: string | undefined;
            "timeout-in-minutes": number;
        }>;
        "build-id": z.ZodString;
        "completed-phase": z.ZodString;
        "completed-phase-context": z.ZodString;
        "completed-phase-duration-seconds": z.ZodNumber;
        "completed-phase-end": z.ZodString;
        "completed-phase-start": z.ZodString;
        "completed-phase-status": z.ZodString;
        "project-name": z.ZodString;
        version: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        "additional-information": {
            artifact: {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            };
            cache: {
                location?: string | undefined;
                type: string;
            };
            environment: {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            };
            logs: {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            };
            "network-interface": {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            };
            source: {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            };
            "vpc-config": {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            };
            "build-complete": boolean;
            "build-start-time": string;
            initiator: string;
            phases: {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }[];
            "queued-timeout-in-minutes": number;
            "source-version"?: string | undefined;
            "timeout-in-minutes": number;
        };
        "build-id": string;
        "completed-phase": string;
        "completed-phase-context": string;
        "completed-phase-duration-seconds": number;
        "completed-phase-end": string;
        "completed-phase-start": string;
        "completed-phase-status": string;
        "project-name": string;
        version: string;
    }, {
        "additional-information": {
            artifact: {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            };
            cache: {
                location?: string | undefined;
                type: string;
            };
            environment: {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            };
            logs: {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            };
            "network-interface": {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            };
            source: {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            };
            "vpc-config": {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            };
            "build-complete": boolean;
            "build-start-time": string;
            initiator: string;
            phases: {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }[];
            "queued-timeout-in-minutes": number;
            "source-version"?: string | undefined;
            "timeout-in-minutes": number;
        };
        "build-id": string;
        "completed-phase": string;
        "completed-phase-context": string;
        "completed-phase-duration-seconds": number;
        "completed-phase-end": string;
        "completed-phase-start": string;
        "completed-phase-status": string;
        "project-name": string;
        version: string;
    }>;
    account: z.ZodString;
    "detail-type": z.ZodLiteral<"CodeBuild Build Phase Change">;
    id: z.ZodString;
    region: z.ZodString;
    resources: z.ZodArray<z.ZodString, "many">;
    source: z.ZodString;
    time: z.ZodString;
    version: z.ZodString;
}, "strip", z.ZodTypeAny, {
    detail: {
        "additional-information": {
            artifact: {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            };
            cache: {
                location?: string | undefined;
                type: string;
            };
            environment: {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            };
            logs: {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            };
            "network-interface": {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            };
            source: {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            };
            "vpc-config": {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            };
            "build-complete": boolean;
            "build-start-time": string;
            initiator: string;
            phases: {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }[];
            "queued-timeout-in-minutes": number;
            "source-version"?: string | undefined;
            "timeout-in-minutes": number;
        };
        "build-id": string;
        "completed-phase": string;
        "completed-phase-context": string;
        "completed-phase-duration-seconds": number;
        "completed-phase-end": string;
        "completed-phase-start": string;
        "completed-phase-status": string;
        "project-name": string;
        version: string;
    };
    account: string;
    "detail-type": "CodeBuild Build Phase Change";
    id: string;
    region: string;
    resources: string[];
    source: string;
    time: string;
    version: string;
}, {
    detail: {
        "additional-information": {
            artifact: {
                location: string;
                md5sum?: string | undefined;
                sha256sum?: string | undefined;
            };
            cache: {
                location?: string | undefined;
                type: string;
            };
            environment: {
                "compute-type": string;
                "environment-variables": ({
                    name?: string | null | undefined;
                    type?: string | null | undefined;
                    value?: string | null | undefined;
                } | null)[];
                image: string;
                "image-pull-credentials-type": string;
                "privileged-mode": boolean;
                type: string;
            };
            logs: {
                "deep-link": string;
                "group-name": string;
                "stream-name": string;
            };
            "network-interface": {
                "eni-id"?: string | undefined;
                "subnet-id"?: string | undefined;
            };
            source: {
                auth?: {
                    type?: string | undefined;
                } | undefined;
                buildspec?: string | undefined;
                location?: string | undefined;
                type: string;
            };
            "vpc-config": {
                "security-group-ids": (string | null)[];
                subnets: {
                    "build-fleet-az": string;
                    "customer-az": string;
                    "subnet-id": string;
                }[];
                "vpc-id": string;
            };
            "build-complete": boolean;
            "build-start-time": string;
            initiator: string;
            phases: {
                "duration-in-seconds"?: number | undefined;
                "end-time"?: string | undefined;
                "phase-context"?: (string | null)[] | undefined;
                "phase-status"?: string | undefined;
                "phase-type": string;
                "start-time": string;
            }[];
            "queued-timeout-in-minutes": number;
            "source-version"?: string | undefined;
            "timeout-in-minutes": number;
        };
        "build-id": string;
        "completed-phase": string;
        "completed-phase-context": string;
        "completed-phase-duration-seconds": number;
        "completed-phase-end": string;
        "completed-phase-start": string;
        "completed-phase-status": string;
        "project-name": string;
        version: string;
    };
    account: string;
    "detail-type": "CodeBuild Build Phase Change";
    id: string;
    region: string;
    resources: string[];
    source: string;
    time: string;
    version: string;
}>;
export declare const EndpointByMethod: {};
export type EndpointByMethod = typeof EndpointByMethod;
export type EndpointParameters = {
    body?: unknown;
    query?: Record<string, unknown>;
    header?: Record<string, unknown>;
    path?: Record<string, unknown>;
};
export type MutationMethod = "post" | "put" | "patch" | "delete";
export type Method = "get" | "head" | "options" | MutationMethod;
type RequestFormat = "json" | "form-data" | "form-url" | "binary" | "text";
export type DefaultEndpoint = {
    parameters?: EndpointParameters | undefined;
    response: unknown;
};
export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
    operationId: string;
    method: Method;
    path: string;
    requestFormat: RequestFormat;
    parameters?: TConfig["parameters"];
    meta: {
        alias: string;
        hasParameters: boolean;
        areParametersRequired: boolean;
    };
    response: TConfig["response"];
};
type Fetcher = (method: Method, url: string, parameters?: EndpointParameters | undefined) => Promise<Endpoint["response"]>;
export declare class ApiClient {
    fetcher: Fetcher;
    baseUrl: string;
    constructor(fetcher: Fetcher);
    setBaseUrl(baseUrl: string): this;
}
export declare function createApiClient(fetcher: Fetcher, baseUrl?: string): ApiClient;
export {};
/**
 Example usage:
 const api = createApiClient((method, url, params) =>
   fetch(url, { method, body: JSON.stringify(params) }).then((res) => res.json()),
 );
 api.get("/users").then((users) => console.log(users));
 api.post("/users", { body: { name: "John" } }).then((user) => console.log(user));
 api.put("/users/:id", { path: { id: 1 }, body: { name: "John" } }).then((user) => console.log(user));
*/
