[workloads](../../index.md) / [introspection](../index.md) / packageVersion

# Function: packageVersion()

```ts
function packageVersion(packageName, projectRoot?): Promise<string | undefined>;
```

Returns the installed version of a package or `undefined` if the package is not installed.

## Parameters

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

`packageName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`projectRoot?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`string` \| `undefined`\>
