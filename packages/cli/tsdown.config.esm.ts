import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/cli.ts", "src/commands/**/*.ts"],
  format: ["esm"],
  dts: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  target: false,
});
