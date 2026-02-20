[workloads](../../index.md) / [main](../index.md) / StatefulWorkloadWithClient

# Abstract Interface: StatefulWorkloadWithClient

## Type Param

Client type

## Extends

- [`StatefulWorkload`](StatefulWorkload.md)

## Extended by

- [`Database`](Database.md)
- [`Redis`](../classes/Redis.md)

## Accessors

### connectionString

#### Get Signature

```ts
get connectionString(): string;
```

Reads the value fron environment variable name that should hold the connection string.

##### Returns

`string`

***

### connectionStringEnvVar

#### Get Signature

```ts
get connectionStringEnvVar(): string;
```

Returns the unique environment variable name that should hold the connection string.

##### Returns

`string`

***

### connStringComponents

#### Get Signature

```ts
get abstract connStringComponents(): string[];
```

**`Internal`**

##### Returns

`string`[]

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
