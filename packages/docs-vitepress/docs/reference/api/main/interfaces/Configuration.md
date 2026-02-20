[workloads](../../index.md) / [main](../index.md) / Configuration

# Interface: Configuration

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="containers"></a> `containers?` | `object` | Container configurations. |
| `containers.minio?` | [`ContainerConfig`](ContainerConfig.md) | **Default** `{ imageName: "localstack/localstack:3.8.1", exposedPorts: [ { container: 4566, host: 4566 } ] }` |
| `containers.mySqlDatabase?` | [`ContainerConfig`](ContainerConfig.md) | **Default** `{ imageName: "mysql:8.4.3", exposedPorts: [ { container: 3306, host: 3306 } ] }` |
| `containers.postgresDatabase?` | [`ContainerConfig`](ContainerConfig.md) | **Default** `{ imageName: "postgres:16.5-alpine3.20", exposedPorts: [ { container: 5432, host: 5432 } ] }` |
| `containers.redis?` | [`ContainerConfig`](ContainerConfig.md) | **Default** `{ imageName: "redis:7.4.1-alpine3.20", exposedPorts: [ { container: 6379, host: 6379 } ] }` |
| <a id="envfilename"></a> `envFileName?` | `object` | Names of the dotenv files to write the workloads' connection strings. |
| `envFileName.development?` | `string` | File name for development. **Default** `.env.local` |
| `envFileName.test?` | `string` | File name for test. **Default** `.env.test.local` |
| <a id="workloadspath"></a> `workloadsPath` | `string` | Path to a folder with workloads. |
