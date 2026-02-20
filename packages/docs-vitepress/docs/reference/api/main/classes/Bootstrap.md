[workloads](../../index.md) / [main](../index.md) / Bootstrap

# Class: Bootstrap

Workload for defining bootstrap an npm script to run when rolling out a fresh application.

## Example

```ts
import { Bootstrap } from "@monolayer/sdk";

const bootstrap = new Bootstrap("bootstrap", {
  script: "db:create",
});

export default bootstrap;
```

## Extends

- [`LifecycleWorkload`](../interfaces/LifecycleWorkload.md)

## Constructors

### Constructor

```ts
new Bootstrap(id, options): Bootstrap;
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

`Bootstrap`

#### Overrides

```ts
LifecycleWorkload.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_brand"></a> `_brand` | `public` | `"bootstrap"` | **`Internal`** |
| <a id="id"></a> `id` | `readonly` | `string` | Unique ID |
| <a id="script"></a> `script` | `public` | `string` | - |
