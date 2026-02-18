#!/usr/bin/env node

import { Effect } from "effect";

import { runCli } from "./program.js";

const exitCode = await Effect.runPromise(runCli(process.argv.slice(2)));
process.exit(exitCode);
