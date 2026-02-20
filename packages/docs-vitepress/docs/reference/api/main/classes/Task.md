[workloads](../../index.md) / [main](../index.md) / Task

# Class: Task\<P\>

## Extends

- [`Workload`](../interfaces/Workload.md)

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

`P`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

```ts
new Task<P>(
   name, 
   work, 
options?): Task<P>;
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

`name`

</td>
<td>

`string`

</td>
<td>

Name of the task.

</td>
</tr>
<tr>
<td>

`work`

</td>
<td>

(`task`) => `Promise`\<`void`\>

</td>
<td>

Function that processes a task.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`TaskOptions`](../interfaces/TaskOptions.md)\<`P`\>

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`Task`\<`P`\>

#### Overrides

```ts
Workload.constructor
```

## Methods

### handleError()

```ts
handleError(
   error?, 
   data?, 
   executionId?): void;
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

`error?`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`data?`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`executionId?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### performLater()

```ts
performLater(data, options?): Promise<ExecutionId | ExecutionId[]>;
```

Performs the task later, dispatching the task to a queue.

**NOTES**

In development, the task will be performed immediately.

In test, the task will collected ans can be retrieved with the `performedTasks` test helper.

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

`data`

</td>
<td>

`P` \| `P`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`PerformOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`ExecutionId` \| `ExecutionId`[]\>

***

### performNow()

```ts
performNow(data): Promise<void>;
```

Performs the task immediately in the current processs.

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

`data`

</td>
<td>

`P` \| `P`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
| <a id="name"></a> `name` | `public` | `string` | Name of the task. |
| <a id="options"></a> `options?` | `public` | [`TaskOptions`](../interfaces/TaskOptions.md)\<`P`\> | - |
| <a id="work"></a> `work` | `public` | (`task`) => `Promise`\<`void`\> | Function that processes a task. |
