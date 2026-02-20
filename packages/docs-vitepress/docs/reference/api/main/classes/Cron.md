[workloads](../../index.md) / [main](../index.md) / Cron

# Class: Cron

Workload for recurring tasks.

A Cron workload is initialized with a unique id and the following options:

- `schedule` in [unix-cron](https://man7.org/linux/man-pages/man5/crontab.5.html)
format to specify when it should run.

- `run` function with the code that will be executed.

## Example

```ts
import { Cron } from "@monolayer/sdk";

const reports = new Cron("reports", {
  schedule: "* * * * *",
  run: async () => {
    // Do something;
  },
});

export default reports;
```

## Extends

- [`StatelessWorkload`](../interfaces/StatelessWorkload.md)

## Constructors

### Constructor

```ts
new Cron(id, options): Cron;
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

[`CronOptions`](../interfaces/CronOptions.md)

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

#### Returns

`Cron`

#### Overrides

```ts
StatelessWorkload.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="_brand"></a> `_brand` | `public` | `"cron"` | **`Internal`** |
| <a id="id"></a> `id` | `public` | `string` | Unique ID |
| <a id="options"></a> `options` | `public` | [`CronOptions`](../interfaces/CronOptions.md) | - |
| <a id="run"></a> `run` | `public` | () => `Promise`\<`void`\> | - |
| <a id="schedule"></a> `schedule` | `public` | `string` | - |
