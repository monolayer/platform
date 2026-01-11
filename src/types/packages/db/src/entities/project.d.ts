import { Entity, EntityRepository, type DecodedItem, type FormattedItem, type TransformedItem } from "dynamodb-toolbox";
import { z } from "zod/v3";
export declare const Project: Entity<"PROJECT", import("dynamodb-toolbox").Table<{
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
}, "_et">, {
    PK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    name: import("dynamodb-toolbox").StringSchema<{}>;
    mc: import("dynamodb-toolbox").StringSchema<{
        enum: ["MC"];
        putDefault: unknown;
    }>;
    organization: import("dynamodb-toolbox").StringSchema<{}>;
    team: import("dynamodb-toolbox").StringSchema<{}>;
    repository: import("dynamodb-toolbox").MapSchema<{
        name: import("dynamodb-toolbox").StringSchema<{}>;
        url: import("dynamodb-toolbox").StringSchema<{}>;
        provider: import("dynamodb-toolbox").StringSchema<{}>;
        productionBranch: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>;
    ecrRepositories: import("dynamodb-toolbox").MapSchema<{
        app: import("dynamodb-toolbox").StringSchema<{}>;
        tasks: import("dynamodb-toolbox").StringSchema<{}>;
        crons: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>;
    _wp: import("dynamodb-toolbox").StringSchema<{
        enum: ["true"];
        putDefault: unknown;
    }>;
    _progressType: import("dynamodb-toolbox").StringSchema<{
        enum: ["PROJECT"];
        putDefault: unknown;
    }>;
    progress: import("dynamodb-toolbox").StringSchema<{
        enum: ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
    }>;
    environmentVariables: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        name: import("dynamodb-toolbox").StringSchema<{}>;
        value: import("dynamodb-toolbox").StringSchema<{}>;
        environment: import("dynamodb-toolbox").StringSchema<{}>;
        updatedAt: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>, {
        putDefault: unknown;
    }>;
    appSettings: import("dynamodb-toolbox").MapSchema<{
        cpu: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
        }, {}>;
        timeout: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    tasksSettings: import("dynamodb-toolbox").MapSchema<{
        cpu: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
        }, {}>;
        timeout: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    cronsSettings: import("dynamodb-toolbox").MapSchema<{
        cpu: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    postgresACUSettings: import("dynamodb-toolbox").MapSchema<{
        current: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
        pending: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    mysqlACUSettings: import("dynamodb-toolbox").MapSchema<{
        current: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
        pending: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    customDomain: import("dynamodb-toolbox").MapSchema<{
        fqdn: import("dynamodb-toolbox").StringSchema<{}>;
        rootRedirect: import("dynamodb-toolbox").BooleanSchema<{}>;
        certificateArn: import("dynamodb-toolbox").StringSchema<{}>;
        certificate: import("dynamodb-toolbox").MapSchema<{
            Arn: import("dynamodb-toolbox").StringSchema<{}>;
            status: import("dynamodb-toolbox").StringSchema<{}>;
            resourceRecord: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
                type: import("dynamodb-toolbox").StringSchema<{}>;
                name: import("dynamodb-toolbox").StringSchema<{}>;
                value: import("dynamodb-toolbox").StringSchema<{}>;
            }, {}>, {}>;
        }, {
            required: "never";
        }>;
        status: import("dynamodb-toolbox").StringSchema<{
            enum: ["INACTIVE", "SELECT_DOMAIN", "CREATE_CERTIFICATE", "VALIDATE_CERTIFICATE", "ATTACH_CERTIFICATE_TO_DISTRIBUTION", "UPDATE_CLOUDFRONT_DISTRIBUTION", "UPDATE_DNS_RECORDS", "ACTIVE"];
            putDefault: unknown;
            required: "never";
        }>;
    }, {
        required: "never";
    }>;
    edgeSettings: import("dynamodb-toolbox").MapSchema<{
        purgeCacheAfterDeploy: import("dynamodb-toolbox").BooleanSchema<{}>;
    }, {
        required: "never";
    }>;
    GSI1: import("dynamodb-toolbox").StringSchema<{}>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>;
export declare function assertProjectRecord(image: unknown): asserts image is ProjectRecord;
export type ProjectRecord = TransformedItem<typeof Project>;
export type ReadProject = DecodedItem<typeof Project>;
export type FormattedProject = FormattedItem<typeof Project>;
export declare const CreateProjectDetailType = "CreateProject";
export type CreateProjectDetailType = typeof CreateProjectDetailType;
export declare const CreateProject: z.ZodObject<{
    type: z.ZodLiteral<"CreateProject">;
    project: z.ZodObject<{
        name: z.ZodString;
        settings: z.ZodObject<{
            domain: z.ZodString;
            repository: z.ZodString;
            repositoryProvider: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            domain: string;
            repository: string;
            repositoryProvider: string;
        }, {
            domain: string;
            repository: string;
            repositoryProvider: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        settings: {
            domain: string;
            repository: string;
            repositoryProvider: string;
        };
    }, {
        name: string;
        settings: {
            domain: string;
            repository: string;
            repositoryProvider: string;
        };
    }>;
    tags: z.ZodObject<{
        managedBy: z.ZodLiteral<"monolayer">;
        license: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        managedBy: "monolayer";
        license: string;
    }, {
        managedBy: "monolayer";
        license: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "CreateProject";
    project: {
        name: string;
        settings: {
            domain: string;
            repository: string;
            repositoryProvider: string;
        };
    };
    tags: {
        managedBy: "monolayer";
        license: string;
    };
}, {
    type: "CreateProject";
    project: {
        name: string;
        settings: {
            domain: string;
            repository: string;
            repositoryProvider: string;
        };
    };
    tags: {
        managedBy: "monolayer";
        license: string;
    };
}>;
export type HostedZoneCreationRequested = z.infer<typeof CreateProject>;
export declare const ProjectProgressSchema: z.ZodObject<{
    type: z.ZodLiteral<"PROJECT">;
    progress: z.ZodEnum<["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"]>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "PROJECT";
    progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCESS";
    updatedAt: string;
}, {
    type: "PROJECT";
    progress: "CANCEL_COMPLETE" | "CANCEL_IN_PROGRESS" | "FAILED" | "IN_PROGRESS" | "PENDING" | "SUCCESS";
    updatedAt: string;
}>;
export type ProjectProgressEvent = z.TypeOf<typeof ProjectProgressSchema>;
export declare const ProjectRepository: EntityRepository<Entity<"PROJECT", import("dynamodb-toolbox").Table<{
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
}, "_et">, {
    PK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    SK: import("dynamodb-toolbox").StringSchema<{
        key: true;
        required: "always";
        transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<"PROJECT", "-">;
    }>;
    name: import("dynamodb-toolbox").StringSchema<{}>;
    mc: import("dynamodb-toolbox").StringSchema<{
        enum: ["MC"];
        putDefault: unknown;
    }>;
    organization: import("dynamodb-toolbox").StringSchema<{}>;
    team: import("dynamodb-toolbox").StringSchema<{}>;
    repository: import("dynamodb-toolbox").MapSchema<{
        name: import("dynamodb-toolbox").StringSchema<{}>;
        url: import("dynamodb-toolbox").StringSchema<{}>;
        provider: import("dynamodb-toolbox").StringSchema<{}>;
        productionBranch: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>;
    ecrRepositories: import("dynamodb-toolbox").MapSchema<{
        app: import("dynamodb-toolbox").StringSchema<{}>;
        tasks: import("dynamodb-toolbox").StringSchema<{}>;
        crons: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>;
    _wp: import("dynamodb-toolbox").StringSchema<{
        enum: ["true"];
        putDefault: unknown;
    }>;
    _progressType: import("dynamodb-toolbox").StringSchema<{
        enum: ["PROJECT"];
        putDefault: unknown;
    }>;
    progress: import("dynamodb-toolbox").StringSchema<{
        enum: ["PENDING", "IN_PROGRESS", "CANCEL_IN_PROGRESS", "CANCEL_COMPLETE", "FAILED", "SUCCESS"];
    }>;
    environmentVariables: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
        name: import("dynamodb-toolbox").StringSchema<{}>;
        value: import("dynamodb-toolbox").StringSchema<{}>;
        environment: import("dynamodb-toolbox").StringSchema<{}>;
        updatedAt: import("dynamodb-toolbox").StringSchema<{}>;
    }, {}>, {
        putDefault: unknown;
    }>;
    appSettings: import("dynamodb-toolbox").MapSchema<{
        cpu: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
        }, {}>;
        timeout: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    tasksSettings: import("dynamodb-toolbox").MapSchema<{
        cpu: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
        }, {}>;
        timeout: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [15, 30, 60, 300, 600, 840];
                putDefault: unknown;
            }>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    cronsSettings: import("dynamodb-toolbox").MapSchema<{
        cpu: import("dynamodb-toolbox").MapSchema<{
            current: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
            pending: import("dynamodb-toolbox").NumberSchema<{
                enum: [1, 2, 3];
                putDefault: unknown;
            }>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    postgresACUSettings: import("dynamodb-toolbox").MapSchema<{
        current: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
        pending: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    mysqlACUSettings: import("dynamodb-toolbox").MapSchema<{
        current: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
        pending: import("dynamodb-toolbox").MapSchema<{
            min: import("dynamodb-toolbox").NumberSchema<{}>;
            max: import("dynamodb-toolbox").NumberSchema<{}>;
        }, {}>;
    }, {
        putDefault: unknown;
    }>;
    customDomain: import("dynamodb-toolbox").MapSchema<{
        fqdn: import("dynamodb-toolbox").StringSchema<{}>;
        rootRedirect: import("dynamodb-toolbox").BooleanSchema<{}>;
        certificateArn: import("dynamodb-toolbox").StringSchema<{}>;
        certificate: import("dynamodb-toolbox").MapSchema<{
            Arn: import("dynamodb-toolbox").StringSchema<{}>;
            status: import("dynamodb-toolbox").StringSchema<{}>;
            resourceRecord: import("dynamodb-toolbox").ListSchema<import("dynamodb-toolbox").MapSchema<{
                type: import("dynamodb-toolbox").StringSchema<{}>;
                name: import("dynamodb-toolbox").StringSchema<{}>;
                value: import("dynamodb-toolbox").StringSchema<{}>;
            }, {}>, {}>;
        }, {
            required: "never";
        }>;
        status: import("dynamodb-toolbox").StringSchema<{
            enum: ["INACTIVE", "SELECT_DOMAIN", "CREATE_CERTIFICATE", "VALIDATE_CERTIFICATE", "ATTACH_CERTIFICATE_TO_DISTRIBUTION", "UPDATE_CLOUDFRONT_DISTRIBUTION", "UPDATE_DNS_RECORDS", "ACTIVE"];
            putDefault: unknown;
            required: "never";
        }>;
    }, {
        required: "never";
    }>;
    edgeSettings: import("dynamodb-toolbox").MapSchema<{
        purgeCacheAfterDeploy: import("dynamodb-toolbox").BooleanSchema<{}>;
    }, {
        required: "never";
    }>;
    GSI1: import("dynamodb-toolbox").StringSchema<{}>;
}, import("dynamodb-toolbox").EntityAttrDefaultOptions, import("dynamodb-toolbox").TimestampsDefaultOptions>>;
export type CustomDomainStatus = NonNullable<NonNullable<FormattedProject["customDomain"]>["status"]>;
