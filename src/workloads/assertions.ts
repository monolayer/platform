import type { Bucket } from "~/workloads/stateful/bucket.js";
import type { PostgresDatabase } from "~/workloads/stateful/postgres-database.js";
import type { Redis } from "~/workloads/stateful/redis.js";
import type { Cron } from "~/workloads/stateless/cron.js";
import type { Task } from "~/workloads/stateless/task/task.js";
import type { Workload } from "~/workloads/workload.js";
import type { AnyBroadcast } from "./stateless/broadcast/router.js";

export function assertRedis(_workload: Workload): asserts _workload is Redis {}

export function assertPostgresDatabase(
  _workload: Workload,
): asserts _workload is PostgresDatabase {}

export function assertBucket(
  _workload: Workload,
): asserts _workload is Bucket {}

export function assertCron(_workload: Workload): asserts _workload is Cron {}

export function assertTask(
  _workload: Workload,
): asserts _workload is Task<unknown> {}

export function assertBroadcast(
  _workload: Workload,
): asserts _workload is AnyBroadcast {}
