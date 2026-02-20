[workloads](../../index.md) / [main](../index.md) / AfterRollout

# Class: AfterRollout

Workload for defining an npm script to run after rolling out a new application version.

## Example

```ts
import { AfterRollout } from "@monolayer/sdk";

const rollout = new AfterRollout("after-rollout-1",{
  script: "notify",
});

export rollout;
```

## Extends

- [`LifecycleWorkload`](../interfaces/LifecycleWorkload.md)

## Constructors

### Constructor

```ts
new AfterRollout(id, options): AfterRollout;
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

Unique ID

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`LifecycleWorkloadOptions`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`AfterRollout`

#### Overrides

```ts
LifecycleWorkload.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_brand"></a> `_brand` | `public` | `"after-rollout"` | **`Internal`** |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
| <a id="script"></a> `script` | `public` | `string` | - |
