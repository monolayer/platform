[workloads](../../index.md) / [main](../index.md) / BroadcastPublisher

# Class: BroadcastPublisher\<C\>

Publisher.
Handles connection management, authentication, and provides
an interface for publishing events.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` *extends* `Record`\<`string`, [`ChannelData`](ChannelData.md)\<`any`\>\>

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

```ts
new BroadcastPublisher<C>(): BroadcastPublisher<C>;
```

#### Returns

`BroadcastPublisher`\<`C`\>

## Methods

### connect()

```ts
connect(): Promise<void>;
```

Establishes a connection to the AWS AppSync Events WebSocket API.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the connection is successfully established.

***

### disconnect()

```ts
disconnect(): void;
```

Disconnects from the AWS AppSync Events WebSocket API.

#### Returns

`void`

***

### publishTo()

```ts
publishTo<T>(
   channelName, 
   params, 
data): Promise<boolean>;
```

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* `string`

</td>
</tr>
</tbody>
</table>

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

`channelName`

</td>
<td>

`ValidateUniqueParams`\<`T`\>

</td>
</tr>
<tr>
<td>

`params`

</td>
<td>

`RouteParams`\<`T`\>

</td>
</tr>
<tr>
<td>

`data`

</td>
<td>

`C`\[`T`\] *extends* [`ChannelData`](ChannelData.md)\<`P`\> ? `P`[] : `never`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`boolean`\>
