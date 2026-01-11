export declare const customDomainStatus: {
    readonly INACTIVE: "INACTIVE";
    readonly SELECT_DOMAIN: "SELECT_DOMAIN";
    readonly CREATE_CERTIFICATE: "CREATE_CERTIFICATE";
    readonly VALIDATE_CERTIFICATE: "VALIDATE_CERTIFICATE";
    readonly ATTACH_CERTIFICATE_TO_DISTRIBUTION: "ATTACH_CERTIFICATE_TO_DISTRIBUTION";
    readonly UPDATE_CLOUDFRONT_DISTRIBUTION: "UPDATE_CLOUDFRONT_DISTRIBUTION";
    readonly UPDATE_DNS_RECORDS: "UPDATE_DNS_RECORDS";
    readonly ACTIVE: "ACTIVE";
};
export type CustomDomainStatus = (typeof customDomainStatus)[keyof typeof customDomainStatus];
export declare const customDomain: import("dynamodb-toolbox").MapSchema_<{
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
