[workloads](../../index.md) / [introspection](../index.md) / manifestJsonSchema

# Variable: manifestJsonSchema

```ts
const manifestJsonSchema: object;
```

## Type Declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| <a id="property-defs"></a> `$defs` | `object` | - |
| `$defs.BucketInfo` | `object` | - |
| `$defs.BucketInfo.properties` | `object` | - |
| `$defs.BucketInfo.properties.name` | `object` | - |
| `$defs.BucketInfo.properties.name.type` | `string` | `"string"` |
| `$defs.BucketInfo.properties.private` | `object` | - |
| `$defs.BucketInfo.properties.private.type` | `string` | `"boolean"` |
| `$defs.BucketInfo.required` | `string`[] | - |
| `$defs.BucketInfo.type` | `string` | `"object"` |
| `$defs.CronInfo` | `object` | - |
| `$defs.CronInfo.properties` | `object` | - |
| `$defs.CronInfo.properties.dockerfile` | `object` | - |
| `$defs.CronInfo.properties.dockerfile.type` | `string` | `"string"` |
| `$defs.CronInfo.properties.entryPoint` | `object` | - |
| `$defs.CronInfo.properties.entryPoint.type` | `string` | `"string"` |
| `$defs.CronInfo.properties.id` | `object` | - |
| `$defs.CronInfo.properties.id.type` | `string` | `"string"` |
| `$defs.CronInfo.properties.path` | `object` | - |
| `$defs.CronInfo.properties.path.type` | `string` | `"string"` |
| `$defs.CronInfo.properties.schedule` | `object` | - |
| `$defs.CronInfo.properties.schedule.type` | `string` | `"string"` |
| `$defs.CronInfo.required` | `string`[] | - |
| `$defs.CronInfo.type` | `string` | `"object"` |
| `$defs.Database` | `object` | - |
| `$defs.Database.properties` | `object` | - |
| `$defs.Database.properties.connectionStringEnvVar` | `object` | - |
| `$defs.Database.properties.connectionStringEnvVar.type` | `string` | `"string"` |
| `$defs.Database.properties.name` | `object` | - |
| `$defs.Database.properties.name.type` | `string` | `"string"` |
| `$defs.Database.required` | `string`[] | - |
| `$defs.Database.type` | `string` | `"object"` |
| `$defs.DatabaseWorkloadInfo` | `object` | - |
| `$defs.DatabaseWorkloadInfo.properties` | `object` | - |
| `$defs.DatabaseWorkloadInfo.properties.databases` | `object` | - |
| `$defs.DatabaseWorkloadInfo.properties.databases.items` | `object` | - |
| `$defs.DatabaseWorkloadInfo.properties.databases.items.$ref` | `string` | `"#/$defs/Database"` |
| `$defs.DatabaseWorkloadInfo.properties.databases.type` | `string` | `"array"` |
| `$defs.DatabaseWorkloadInfo.properties.id` | `object` | - |
| `$defs.DatabaseWorkloadInfo.properties.id.type` | `string` | `"string"` |
| `$defs.DatabaseWorkloadInfo.required` | `string`[] | - |
| `$defs.DatabaseWorkloadInfo.type` | `string` | `"object"` |
| `$defs.TaskInfo` | `object` | - |
| `$defs.TaskInfo.properties` | `object` | - |
| `$defs.TaskInfo.properties.dockerfile` | `object` | - |
| `$defs.TaskInfo.properties.dockerfile.type` | `string` | `"string"` |
| `$defs.TaskInfo.properties.entryPoint` | `object` | - |
| `$defs.TaskInfo.properties.entryPoint.type` | `string` | `"string"` |
| `$defs.TaskInfo.properties.id` | `object` | - |
| `$defs.TaskInfo.properties.id.type` | `string` | `"string"` |
| `$defs.TaskInfo.properties.path` | `object` | - |
| `$defs.TaskInfo.properties.path.type` | `string` | `"string"` |
| `$defs.TaskInfo.required` | `string`[] | - |
| `$defs.TaskInfo.type` | `string` | `"object"` |
| `$defs.WorkloadInfo` | `object` | - |
| `$defs.WorkloadInfo.properties` | `object` | - |
| `$defs.WorkloadInfo.properties.connectionStringEnvVar` | `object` | - |
| `$defs.WorkloadInfo.properties.connectionStringEnvVar.type` | `string` | `"string"` |
| `$defs.WorkloadInfo.properties.id` | `object` | - |
| `$defs.WorkloadInfo.properties.id.type` | `string` | `"string"` |
| `$defs.WorkloadInfo.required` | `string`[] | - |
| `$defs.WorkloadInfo.type` | `string` | `"object"` |
| <a id="property-id"></a> `$id` | `string` | `"workloads-build-manifest-schema-v1"` |
| <a id="property-schema"></a> `$schema` | `string` | `"https://json-schema.org/draft/2020-12/schema"` |
| <a id="property-optional"></a> `optional` | `string`[] | - |
| <a id="property-properties"></a> `properties` | `object` | - |
| `properties.broadcast` | `object` | - |
| `properties.broadcast.entryPoint` | `object` | - |
| `properties.broadcast.entryPoint.type` | `string` | `"string"` |
| `properties.broadcast.id` | `object` | - |
| `properties.broadcast.id.type` | `string` | `"string"` |
| `properties.broadcast.path` | `object` | - |
| `properties.broadcast.path.type` | `string` | `"string"` |
| `properties.broadcast.type` | `string` | `"string"` |
| `properties.bucket` | `object` | - |
| `properties.bucket.items` | `object` | - |
| `properties.bucket.items.$ref` | `string` | `"#/$defs/BucketInfo"` |
| `properties.bucket.items.description` | `string` | `"Array of Bucket"` |
| `properties.bucket.type` | `string` | `"array"` |
| `properties.cron` | `object` | - |
| `properties.cron.items` | `object` | - |
| `properties.cron.items.$ref` | `string` | `"#/$defs/CronInfo"` |
| `properties.cron.items.description` | `string` | `"Array of Cron"` |
| `properties.cron.type` | `string` | `"array"` |
| `properties.framework` | `object` | - |
| `properties.framework.description` | `string` | `"Application framework"` |
| `properties.framework.type` | `string` | `"string"` |
| `properties.mySqlDatabase` | `object` | - |
| `properties.mySqlDatabase.items` | `object` | - |
| `properties.mySqlDatabase.items.$ref` | `string` | `"#/$defs/DatabaseWorkloadInfo"` |
| `properties.mySqlDatabase.type` | `string` | `"array"` |
| `properties.postgresDatabase` | `object` | - |
| `properties.postgresDatabase.items` | `object` | - |
| `properties.postgresDatabase.items.$ref` | `string` | `"#/$defs/DatabaseWorkloadInfo"` |
| `properties.postgresDatabase.type` | `string` | `"array"` |
| `properties.redis` | `object` | - |
| `properties.redis.items` | `object` | - |
| `properties.redis.items.$ref` | `string` | `"#/$defs/WorkloadInfo"` |
| `properties.redis.type` | `string` | `"array"` |
| `properties.task` | `object` | - |
| `properties.task.items` | `object` | - |
| `properties.task.items.$ref` | `string` | `"#/$defs/TaskInfo"` |
| `properties.task.items.description` | `string` | `"Array of Task"` |
| `properties.task.type` | `string` | `"array"` |
| `properties.version` | `object` | - |
| `properties.version.description` | `string` | `"The version of the schema. This must be '1' for version 1 of the schema."` |
| `properties.version.enum` | `string`[] | - |
| `properties.version.type` | `string` | `"string"` |
| <a id="property-required"></a> `required` | `string`[] | - |
| <a id="property-title"></a> `title` | `string` | `"WorkloadsBuildManifest"` |
| <a id="property-type"></a> `type` | `string` | `"object"` |
