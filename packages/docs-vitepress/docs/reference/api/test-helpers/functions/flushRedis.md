[workloads](../../index.md) / [test-helpers](../index.md) / flushRedis

# Function: flushRedis()

```ts
function flushRedis(workload, db?): Promise<void>;
```

Deletes all the keys of a Redis workload database.

## Parameters

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

`workload`

</td>
<td>

[`Redis`](../../main/classes/Redis.md)

</td>
<td>

Redis workload

</td>
</tr>
<tr>
<td>

`db?`

</td>
<td>

`number`

</td>
<td>

Redis database (default: 0)

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`void`\>
