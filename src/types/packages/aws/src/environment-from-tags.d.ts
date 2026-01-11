export declare function environmentFromTags(tags: {
    Key?: string;
    Value?: string;
}[]): Promise<{
    PK: string;
    SK: string;
    availabilityZoneNames: string[];
    branchName: string;
    cidrBlock: string;
    created: string;
    currentDeployment: string;
    currentDeploymentSK: string;
    ecs?: {
        cluster: string;
        clusterArn: string;
    } | undefined;
    edge?: {
        distributionId: string;
        domainName: string;
    } | undefined;
    modified: string;
    name: string;
    network?: {
        privateSubnets: string[];
        publicSubnets: string[];
        vpcID: string;
    } | undefined;
    previousDeploymentSK: string;
    project: string;
    resources: {
        [x: string]: {
            [x: string]: {
                PhysicalResourceId: string;
                ResourceType: string;
            };
        };
    };
    status?: "CREATED" | "CREATE_FAILED" | "CREATING" | "DELETED" | "DELETE_FAILED" | "DELETING" | "DEPLOYED" | "DEPLOYING" | "DEPLOY_FAILED" | "UPDATED" | "UPDATE_FAILED" | "UPDATING" | undefined;
} | undefined>;
export declare function keyFromTags(tags: {
    Key?: string;
    Value?: string;
}[]): {
    PK: string;
    SK: string;
};
