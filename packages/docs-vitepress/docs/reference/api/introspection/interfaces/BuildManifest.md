[workloads](../../index.md) / [introspection](../index.md) / BuildManifest

# Interface: BuildManifest

## Properties

| Property | Type |
| ------ | ------ |
| <a id="broadcast"></a> `broadcast` | \| `object` \| \{ `entryPoint`: `string`; `id`: `string`; `path`: `string`; \} |
| <a id="bucket"></a> `bucket` | [`BucketInfo`](BucketInfo.md)[] |
| <a id="cron"></a> `cron` | [`CronInto`](CronInto.md)[] |
| <a id="framework"></a> `framework` | `string` |
| <a id="postgresdatabase"></a> `postgresDatabase` | [`DatabaseWorkloadInfo`](DatabaseWorkloadInfo.md)[] |
| <a id="redis"></a> `redis` | [`WorkloadInfo`](WorkloadInfo.md)[] |
| <a id="task"></a> `task` | [`TaskInfo`](TaskInfo.md)[] |
| <a id="version"></a> `version` | `string` |
