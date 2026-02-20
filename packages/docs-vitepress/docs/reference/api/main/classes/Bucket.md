[workloads](../../index.md) / [main](../index.md) / Bucket

# Class: Bucket

Workload for an AWS S3 compatible storage.

The `Bucket` workload is initialized with:
- A valid bucket name.

**NOTES**

Launching the development or test containers with `npx monolayer start dev` will write the environment
variable `ML_AWS_ENDPOINT_URL` will be written to the corresponding dotenv file (`.env` or `.env.test`)

When initializing the S3 client, you need to configure `forcePathStyle` and `endpoint`
if the dev or test container is running (*check for the `ML_AWS_ENDPOINT_URL` environment
variable*). See the example.

## Example

```ts
import { Bucket } from "@monolayer/sdk";

const documents = new Bucket("documents");

export default documents;

// Client configuration

import { S3Client } from "@aws-sdk/client-s3";
import { bucketLocalConfiguration } from "@monolayer/sdk";
export const s3Client = new S3Client({
  ...bucketLocalConfiguration(),
});

// Get Object

const response = await s3Client.send(
  new GetObjectCommand({
    Bucket: documents.name,
    Key: "README.md",
  }),
);

```

## Extends

- [`StatefulWorkload`](../interfaces/StatefulWorkload.md)

## Accessors

### connectionStringEnvVar

#### Get Signature

```ts
get connectionStringEnvVar(): string;
```

**`Internal`**

##### Returns

`string`

***

### name

#### Get Signature

```ts
get name(): string;
```

##### Returns

`string`

## Constructors

### Constructor

```ts
new Bucket(id, options?): Bucket;
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

Bucket ID.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`BucketOptions`](../interfaces/BucketOptions.md)

</td>
<td>

Bucket options

</td>
</tr>
</tbody>
</table>

#### Returns

`Bucket`

#### Overrides

```ts
StatefulWorkload.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
| <a id="publicaccess"></a> `publicAccess` | `public` | [`PublicAccess`](../type-aliases/PublicAccess.md) | Defines public access permissions for specific paths within the bucket. This allows anonymous users to perform actions on objects matching the specified path patterns. |
