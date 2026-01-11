import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        name: "control-plane-sdk",
    },
    server: {
        watch: {
            ignored: [
                "**/node_modules/**",
                "**/dist/**",
                "**/tmp/**",
                "**/docs/**",
                "**/.aws-sam/**",
            ],
        },
    },
});
