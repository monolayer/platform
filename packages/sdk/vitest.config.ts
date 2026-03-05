import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "sdk",
    disableConsoleIntercept: true,
    include: ["test/**/*.test.ts", "src/**/*.test.ts"],
    pool: "forks",
    maxWorkers: 1,
    fileParallelism: false,
    testTimeout: 20000,
    env: {
      // DEBUG: "testcontainers",
    },
    silent: false,
  },
  server: {
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**", "**/tmp/**", "**/docs/**"],
    },
  },
});
