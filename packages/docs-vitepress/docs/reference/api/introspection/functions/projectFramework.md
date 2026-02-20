[workloads](../../index.md) / [introspection](../index.md) / projectFramework

# Function: projectFramework()

```ts
function projectFramework(projectRoot?): Promise<string | undefined>;
```

Returns the slug (unique identifier) of the framework
used in the current project.

Frameworks are defected wirth the package: `@vercel/fs-detectors`

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
