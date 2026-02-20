[workloads](../../index.md) / [main](../index.md) / Broadcast

# Class: Broadcast\<T, S\>

Creates a Broadcast workloads

The constructore takes a session handler and a configuration object for channels. Each channel
is mapped to a path and an optional authorization handler. The channel paths can
include dynamic segments, like `/users/[id]`, which are parsed and passed to the
authorization logic.

## Param

A function that resolves to a session object. This object is available
  within the authorization handlers. It receives an object with `cookies` as an argument.

## Param

An object where keys are route strings and values are objects defining
  the channel and its authorization logic.
  - `auth`: An optional function to authorize "PUBLISH" or "SUBSCRIBE" operations.
    It receives the operation type, route parameters, and the session object.
  - `channel`: The channel instance for the route.

## Example

```ts
import { channel, Broadcast } from "@monolayer/sdk";

const broadcast = new Broadcast(
  async () => ({ userId: 1 }),
  {
    "/todos": {
      channel: channel<{ message: string }>(),
      auth: async (ctx) => {
        console.log("User trying to access todos:", ctx.session.userId);
        return true; // Allow access
      },
    },
    "/users/[id]": {
      channel: channel<{ salute: string }>(),
      auth: async (ctx) => {
        // Only allow users to access their own channel
        return ctx.session.userId === Number(ctx.params.id);
      },
    },
  }
);

export default broadcast;
```

## Extends

- [`Workload`](../interfaces/Workload.md)

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `Record`\<`string`, `any`\>

</td>
<td>

A record mapping channel strings to their channel data types.

</td>
</tr>
<tr>
<td>

`S`

</td>
<td>

The type of the session object, returned by the `session` function.

</td>
</tr>
</tbody>
</table>

## Accessors

### connectionStringEnvVar

#### Get Signature

```ts
get connectionStringEnvVar(): "ML_BROADCAST_URL";
```

##### Returns

`"ML_BROADCAST_URL"`

## Constructors

### Constructor

```ts
new Broadcast<T, S>(initOpts): Broadcast<T, S>;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`initOpts`

</td>
<td>

\{ `channels`: \{ \[channel in string \| number \| symbol\]: ValidateRoute\<channel & string\> extends never ? never : \{ auth?: (ctx: \{ operation: "PUBLISH" \| "SUBSCRIBE"; params: channel extends string ? DrainOuterGeneric\<\{ \[K in string\]: (...)\[(...)\] \}\> : never; session: S \}) =\> Promise\<boolean\>; data: T\[channel\] \} \}; `session?`: (`opts`) => `Promise`\<`S`\>; \}

</td>
</tr>
<tr>
<td>

`initOpts.channels`

</td>
<td>

\{ \[channel in string \| number \| symbol\]: ValidateRoute\<channel & string\> extends never ? never : \{ auth?: (ctx: \{ operation: "PUBLISH" \| "SUBSCRIBE"; params: channel extends string ? DrainOuterGeneric\<\{ \[K in string\]: (...)\[(...)\] \}\> : never; session: S \}) =\> Promise\<boolean\>; data: T\[channel\] \} \}

</td>
</tr>
<tr>
<td>

`initOpts.session?`

</td>
<td>

(`opts`) => `Promise`\<`S`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Broadcast`\<`T`, `S`\>

#### Overrides

```ts
Workload.constructor
```

## Methods

### authFn()

```ts
authFn(
   route, 
   operation, 
session): Promise<boolean>;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`route`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`operation`

</td>
<td>

`"PUBLISH"` \| `"SUBSCRIBE"`

</td>
</tr>
<tr>
<td>

`session`

</td>
<td>

`S`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`boolean`\>

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_channeldatatype"></a> `_channelDataType` | `public` | \{ \[K in string \| number \| symbol\]: T\[K\] \} | - |
| <a id="channels"></a> `channels` | `public` | \{ \[channel in string \| number \| symbol\]: ValidateRoute\<channel & string\> extends never ? never : \{ auth?: (ctx: \{ operation: "PUBLISH" \| "SUBSCRIBE"; params: channel extends string ? DrainOuterGeneric\<\{ \[K in string\]: RouteParams\<(...)\>\[K\] \}\> : never; session: S \}) =\> Promise\<boolean\>; data: T\[channel\] \} \} | - |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
| <a id="session"></a> `session` | `public` | (`opts`) => `Promise`\<`S`\> | - |
