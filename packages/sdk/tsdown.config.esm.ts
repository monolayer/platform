import { defineConfig } from "tsdown";

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/cli.ts",
		"src/commands/**/*.ts",
		"src/workloads.ts",
		"src/test-helpers.ts",
		"src/introspection.ts",
	],
	format: ["esm"],
	dts: true,
	sourcemap: false,
	clean: false,
	// Oclif needs to find commands in the directory structure
	treeshake: true,
	// Preserve directory structure for commands is handled by passing glob to entry
	target: false,
});
