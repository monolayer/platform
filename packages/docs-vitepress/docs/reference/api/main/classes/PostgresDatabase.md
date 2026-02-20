[workloads](../../index.md) / [main](../index.md) / PostgresDatabase

# Class: PostgresDatabase

Workload for PostgreSQL databases.

A `PostgresDatabase` workload is initialized with:
- A valid database name.

The environment variable with the connection string for the database is named after
the `databaseName` and the `databaseId`. See examples.

**NOTES**

When launching the development or test containers with `npx monolayer start dev`, the environment
variable with the connection string for the workload's Docker container
will be written to the corresponding dotenv file (`.env.local` or `.env.local.test`)

## Example

```ts
import { PostgreSQL } from "@monolayer/sdk";
import pg from "pg";

// Workloads on different database servers
export const producstDb = new PostgresDatabase("products");

export const analyticsDb = new PostgresDatabase("analytics");
```

## Extends

- [`Database`](../interfaces/Database.md)

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

[`Database`](../interfaces/Database.md).[`connectionString`](../interfaces/Database.md#connectionstring)

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

[`Database`](../interfaces/Database.md).[`connectionStringEnvVar`](../interfaces/Database.md#connectionstringenvvar)

***

### connStringComponents

#### Get Signature

```ts
get connStringComponents(): string[];
```

**`Internal`**

##### Returns

`string`[]

#### Inherited from

[`Database`](../interfaces/Database.md).[`connStringComponents`](../interfaces/Database.md#connstringcomponents)

***

### databaseId

#### Get Signature

```ts
get databaseId(): string;
```

Database ID

**Note:**
Alias of `ìd`.

##### Returns

`string`

#### Inherited from

[`Database`](../interfaces/Database.md).[`databaseId`](../interfaces/Database.md#databaseid)

## Constructors

### Constructor

```ts
new PostgresDatabase(databaseName): PostgresDatabase;
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

`databaseName`

</td>
<td>

`string`

</td>
<td>

Database name.

</td>
</tr>
</tbody>
</table>

#### Returns

`PostgresDatabase`

#### Inherited from

```ts
Database.constructor
```

## Methods

### connStringPrefix()

```ts
connStringPrefix(): string;
```

**`Internal`**

#### Returns

`string`

#### Overrides

[`Database`](../interfaces/Database.md).[`connStringPrefix`](../interfaces/Database.md#connstringprefix)

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_brand"></a> `_brand` | `public` | `"PostgresDatabase"` | **`Internal`** |
| <a id="databasename"></a> `databaseName` | `readonly` | `string` | Database name. |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
