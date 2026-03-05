import { execute } from "@oclif/core";
import { fileURLToPath } from "node:url";

const cliRoot = fileURLToPath(new URL("../", import.meta.url));

export const runCli = (args: ReadonlyArray<string>) =>
  execute({
    args: [...args],
    dir: cliRoot,
    loadOptions: {
      root: cliRoot,
    },
  });
