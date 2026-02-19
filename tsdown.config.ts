import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts", "src/cli.ts", "src/commands/**/*.ts"],
	format: ["cjs", "esm"],
	dts: true,
	sourcemap: false,
	clean: true,
	noExternal: ["case-anything"],
	// Oclif needs to find commands in the directory structure
	treeshake: true,
	// Preserve directory structure for commands is handled by passing glob to entry
	target: false,
});
