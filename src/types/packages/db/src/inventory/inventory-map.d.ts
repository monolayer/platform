import { Parameter } from "@awboost/cfn-template-builder/template/parameter";
import type { BlueprintContext } from "./blueprint-context";
export declare class InventoryMap {
    context: BlueprintContext;
    constructor(context: BlueprintContext);
    static from(opts: {
        projectName: string;
        deploymentNumber: string;
        environmentName: string;
    }): InventoryMap;
    get hash(): string;
    uniqueHash(name: string): string;
    get projectHash(): string;
    projectUniqueHash(name: string): string;
    get productionECSClusterName(): string;
    get previewECSClusterName(): string;
    get hostedZone(): {
        name: string;
        parameter: Parameter;
    };
    get appRepository(): {
        name: string;
        parameter: Parameter;
    };
    get cronsRepository(): {
        name: string;
        parameter: Parameter;
    };
    get tasksRepository(): {
        name: string;
        parameter: Parameter;
    };
    get platformBucket(): {
        name: string;
        parameter: Parameter;
    };
    get vpcId(): {
        name: string;
        parameter: Parameter;
    };
    get vpcCIDR(): {
        name: string;
        parameter: Parameter;
    };
    get prodPublicSubnets(): {
        name: string;
        parameter: Parameter;
    };
    get previewPublicSubnets(): {
        name: string;
        parameter: Parameter;
    };
    get prodPrivateSubnets(): {
        name: string;
        parameter: Parameter;
    };
    get prodPrivateSubnet1CIDR(): {
        name: string;
        parameter: Parameter;
    };
    get prodPrivateSubnet2CIDR(): {
        name: string;
        parameter: Parameter;
    };
    get previewPrivateSubnets(): {
        name: string;
        parameter: Parameter;
    };
    get previewPrivateSubnet1CIDR(): {
        name: string;
        parameter: Parameter;
    };
    get previewPrivateSubnet2CIDR(): {
        name: string;
        parameter: Parameter;
    };
    get prodCluster(): {
        name: string;
        parameter: Parameter;
    };
    get previewCluster(): {
        name: string;
        parameter: Parameter;
    };
    get prodClusterArn(): {
        name: string;
        parameter: Parameter;
    };
    get previewClusterArn(): {
        name: string;
        parameter: Parameter;
    };
    get cloudFrontDomainName(): {
        name: string;
        parameter: Parameter;
    };
    get keyValueStore(): {
        name: string;
        parameter: Parameter;
    };
    get viewerRequestFunction(): {
        name: string;
        parameter: Parameter;
    };
    get cloudFrontDistributionId(): {
        name: string;
        parameter: Parameter;
    };
    get loadBalancerArn(): {
        name: string;
        parameter: Parameter;
    };
    get loadBalancerTargetGroupArn(): {
        name: string;
        parameter: Parameter;
    };
    get efsAccessPointId(): {
        name: string;
        parameter: Parameter;
    };
    get appLambdaArn(): {
        name: string;
        parameter: Parameter;
    };
    get appLambdaName(): {
        name: string;
        parameter: Parameter;
    };
    get appLambdaURL(): {
        name: string;
        parameter: Parameter;
    };
    get assetsBucket(): {
        name: string;
        parameter: Parameter;
    };
    get artifactsBucket(): {
        name: string;
        parameter: Parameter;
    };
    get cacheBucket(): {
        name: string;
        parameter: Parameter;
    };
    get cacheTagsTable(): {
        name: string;
        parameter: Parameter;
    };
    get broadcastSessionTable(): {
        name: string;
        parameter: Parameter;
    };
    get broadcastHTTP(): {
        name: string;
        parameter: Parameter;
    };
    get broadcastRealtime(): {
        name: string;
        parameter: Parameter;
    };
    get broadcastAuthFunctionArn(): {
        name: string;
        parameter: Parameter;
    };
    get bucketEmptierFunctionArn(): {
        name: string;
        parameter: Parameter;
    };
    get stackNames(): {
        app: string;
        assets: string;
        ecr: string;
        buckets: string;
        edge: string;
        lifecycle: string;
        logs: string;
        postgres: string;
        redis: string;
        vpc: string;
    };
    get tasksDynamoDbTableName(): string;
    get broadcastDynamoDbTableName(): string;
    get bootstrapFamily(): string;
    get beforeRolloutFamily(): string;
    get afterRolloutFamily(): string;
    get imageOptimizerAccessPoint(): string;
    private get base();
    private get baseProjectHash();
    private get baseEnvironmentHash();
    private get envBase();
    private get projectBase();
    get projectName(): string;
    get environmentName(): string;
    private environmentStackName;
    private projectStackName;
}
