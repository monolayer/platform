export declare function fargateTarget(opts: {
    id: string;
    roleArn: string;
    clusterArn: string;
    taskDefinitionArn: string;
    publicSubnets: string[];
    securityGroups: string[];
}): {
    Id: string;
    Arn: string;
    RoleArn: string;
    RetryPolicy: {
        MaximumRetryAttempts: number;
    };
    EcsParameters: {
        TaskDefinitionArn: string;
        EnableECSManagedTags: false;
        EnableExecuteCommand: false;
        LaunchType: string;
        TaskCount: number;
        NetworkConfiguration: {
            AwsVpcConfiguration: {
                AssignPublicIp: string;
                Subnets: string[];
                SecurityGroups: string[];
            };
        };
    };
};
