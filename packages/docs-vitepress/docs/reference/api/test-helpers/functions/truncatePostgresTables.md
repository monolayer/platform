[workloads](../../index.md) / [test-helpers](../index.md) / truncatePostgresTables

# Function: truncatePostgresTables()

```ts
function truncatePostgresTables(workload, schemaName?): Promise<void>;
```

Truncates all the tables in a [PostgresDatabase](../../main/classes/PostgresDatabase.md) workload.

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

[`PostgresDatabase`](../../main/classes/PostgresDatabase.md)

</td>
<td>

PostgresDatabase workload

</td>
</tr>
<tr>
<td>

`schemaName?`

</td>
<td>

`string`

</td>
<td>

Schema name (default: `public`)

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`void`\>
