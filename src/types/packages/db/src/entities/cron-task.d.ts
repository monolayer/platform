import { Entity } from "dynamodb-toolbox";
export declare const CronTask: Entity<
	"CRON_TASK",
	import("dynamodb-toolbox").Table<
		{
			name: "PK";
			type: "string";
		},
		{
			name: "SK";
			type: "string";
		},
		{
			"GSI1-index": {
				type: "global";
				partitionKey: {
					name: "GSI1";
					type: "string";
				};
			};
		},
		"_et"
	>,
	{
		PK: import("dynamodb-toolbox").StringSchema<{
			key: true;
			required: "always";
			transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<
				"PROJECT_ENVIRONMENT",
				"-"
			>;
		}>;
		SK: import("dynamodb-toolbox").StringSchema<{
			key: true;
			required: "always";
			transform: import("dynamodb-toolbox/transformers/prefix").Prefixer<
				"CRON_TASK",
				"-"
			>;
		}>;
		commitSHA: import("dynamodb-toolbox").StringSchema<{}>;
		taskArn: import("dynamodb-toolbox").StringSchema<{}>;
		taskDefinitionArn: import("dynamodb-toolbox").StringSchema<{}>;
		cpu: import("dynamodb-toolbox").StringSchema<{}>;
		memory: import("dynamodb-toolbox").StringSchema<{}>;
		start: import("dynamodb-toolbox").StringSchema<{}>;
		streamName: import("dynamodb-toolbox").StringSchema<{}>;
		logGroup: import("dynamodb-toolbox").StringSchema<{}>;
		end: import("dynamodb-toolbox").StringSchema<{
			required: "never";
		}>;
		exitCode: import("dynamodb-toolbox").NumberSchema<{
			required: "never";
		}>;
	},
	import("dynamodb-toolbox").EntityAttrDefaultOptions,
	import("dynamodb-toolbox").TimestampsDefaultOptions
>;
export type FormattedCronTask = FormattedCronTask;
