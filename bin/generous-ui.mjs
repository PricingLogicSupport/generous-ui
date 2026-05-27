#!/usr/bin/env node
import { runRegistryCommand } from "./registry-core.mjs";

await runRegistryCommand(process.argv.slice(2));
