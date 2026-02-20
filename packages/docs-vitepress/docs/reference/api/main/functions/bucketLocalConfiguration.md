[workloads](../../index.md) / [main](../index.md) / bucketLocalConfiguration

# Function: bucketLocalConfiguration()

```ts
function bucketLocalConfiguration(): 
  | {
  credentials?: undefined;
  endpoint?: undefined;
  forcePathStyle?: undefined;
}
  | {
  credentials: {
     accessKeyId: string;
     secretAccessKey: string;
  };
  endpoint: string | undefined;
  forcePathStyle: boolean;
};
```

## Returns

  \| \{
  `credentials?`: `undefined`;
  `endpoint?`: `undefined`;
  `forcePathStyle?`: `undefined`;
\}
  \| \{
  `credentials`: \{
     `accessKeyId`: `string`;
     `secretAccessKey`: `string`;
  \};
  `endpoint`: `string` \| `undefined`;
  `forcePathStyle`: `boolean`;
\}
