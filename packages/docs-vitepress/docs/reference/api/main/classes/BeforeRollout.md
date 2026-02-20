[workloads](../../index.md) / [main](../index.md) / BeforeRollout

# Class: BeforeRollout

Workload for defining an npm script to run before rolling out a new application version.

## Example

```ts
import { BeforeRollout } from "@monolayer/sdk";

const rollout = new BeforeRollout("before-1", {
  script: "db:migrate",
});

export default rollout;
```

## Extends

- [`LifecycleWorkload`](../interfaces/LifecycleWorkload.md)

## Constructors

### Constructor

```ts
new BeforeRollout(id, options): BeforeRollout;
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

`BeforeRollout`

#### Overrides

```ts
LifecycleWorkload.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_brand"></a> `_brand` | `public` | `"before-rollout"` | **`Internal`** |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
| <a id="script"></a> `script` | `public` | `string` | - |
