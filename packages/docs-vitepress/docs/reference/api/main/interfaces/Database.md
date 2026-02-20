[workloads](../../index.md) / [main](../index.md) / Database

# Abstract Interface: Database

Database workload.

## Type Param

Client type

## Extends

- [`StatefulWorkloadWithClient`](StatefulWorkloadWithClient.md)

## Extended by

- [`PostgresDatabase`](../classes/PostgresDatabase.md)

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

[`StatefulWorkloadWithClient`](StatefulWorkloadWithClient.md).[`connectionString`](StatefulWorkloadWithClient.md#connectionstring)

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

[`StatefulWorkloadWithClient`](StatefulWorkloadWithClient.md).[`connectionStringEnvVar`](StatefulWorkloadWithClient.md#connectionstringenvvar)

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

[`StatefulWorkloadWithClient`](StatefulWorkloadWithClient.md).[`connStringComponents`](StatefulWorkloadWithClient.md#connstringcomponents)

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

## Methods

### connStringPrefix()

```ts
abstract connStringPrefix(): string;
```

**`Internal`**

#### Returns

`string`

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="databasename"></a> `databaseName` | `readonly` | `string` | Database name. |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
