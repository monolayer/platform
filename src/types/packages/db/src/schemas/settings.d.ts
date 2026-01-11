export declare const environmentVariables: import("dynamodb-toolbox").RecordSchema_<import("dynamodb-toolbox").StringSchema<{}>, import("dynamodb-toolbox").StringSchema<{}>, {}>;
export declare const appSettings: import("dynamodb-toolbox").MapSchema_<{
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
export declare const tasksSettings: import("dynamodb-toolbox").MapSchema_<{
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
export declare const cronsSettings: import("dynamodb-toolbox").MapSchema_<{
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
export declare const postgresACUSettings: import("dynamodb-toolbox").MapSchema_<{
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
export declare const mysqlACUSettings: import("dynamodb-toolbox").MapSchema_<{
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
