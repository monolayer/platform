[workloads](../../index.md) / [main](../index.md) / Redis

# Class: Redis

Workload for Redis API compatible servers.

The `Redis` workload is initialized with:
- A stable ID.
- A client constructor function providing the client of your choice.
  The Redis.client \| client accessor will call this function and memoize its result.
  The expected envirnoment variable name with the connection string is passed as an argument.

**NOTES**

When launching the development or test containers with `npx monolayer start dev`, the environment
variable with the connection string for the workload's Docker container
will be written to the corresponding dotenv file (`.env` or `.env.test`)

## Example

```ts
import { Redis } from "@monolayer/sdk";
import { Redis as IORedis } from "ioredis";

const cache = new Redis("cache", (envVarName) =>
  new IORedis(process.env[envVarName]!)
);
```

## Type Param

Client type

## Extends

- [`StatefulWorkloadWithClient`](../interfaces/StatefulWorkloadWithClient.md)

## Accessors

### connectionString

#### Get Signature

```ts
get connectionString(): string;
```

Reads the value fron environment variable name that should hold the connection string.

##### Returns

`string`

#### Inherited from

[`StatefulWorkloadWithClient`](../interfaces/StatefulWorkloadWithClient.md).[`connectionString`](../interfaces/StatefulWorkloadWithClient.md#connectionstring)

***

### connectionStringEnvVar

#### Get Signature

```ts
get connectionStringEnvVar(): string;
```

Returns the unique environment variable name that should hold the connection string.

##### Returns

`string`

#### Inherited from

[`StatefulWorkloadWithClient`](../interfaces/StatefulWorkloadWithClient.md).[`connectionStringEnvVar`](../interfaces/StatefulWorkloadWithClient.md#connectionstringenvvar)

***

### connStringComponents

#### Get Signature

```ts
get connStringComponents(): string[];
```

**`Internal`**

##### Returns

`string`[]

#### Overrides

[`StatefulWorkloadWithClient`](../interfaces/StatefulWorkloadWithClient.md).[`connStringComponents`](../interfaces/StatefulWorkloadWithClient.md#connstringcomponents)

## Constructors

### Constructor

```ts
new Redis(id): Redis;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
<td>

Unique ID.

</td>
</tr>
</tbody>
</table>

#### Returns

`Redis`

#### Inherited from

```ts
StatefulWorkloadWithClient.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_brand"></a> `_brand` | `public` | `"Redis"` | **`Internal`** |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
