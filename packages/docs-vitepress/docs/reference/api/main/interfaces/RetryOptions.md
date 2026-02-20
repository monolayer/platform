[workloads](../../index.md) / [main](../index.md) / RetryOptions

# Interface: RetryOptions

## Properties

| Property | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| <a id="backoff"></a> `backoff?` | `ExponentialBackoff` \| `ConstantBackoff` | `{ type: "constant", delay: 0 }` | Backoff setting for automatic retries if the job fails. **Important** This setting does not have any effect on Tasks backed by an `SQS` queue in production. Retries will happen after the `VisibilityTimeout` of the message expires (30 seconds by default). See: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html#consumer-fails-to-process-message You can to implement an custom backoff strategy using a dead-letter queue to handle retries and a Lambda function. |
| <a id="times"></a> `times` | `number` | `0` | The total number of attempts to try the job until it completes. |
