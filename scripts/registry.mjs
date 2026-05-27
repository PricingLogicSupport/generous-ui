import { runRegistryCommand } from "../bin/registry-core.mjs";

await runRegistryCommand(process.argv.slice(2));
