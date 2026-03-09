import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

const withMDX = createMDX({
  configPath: "lib/source.config.ts",
});

export default withMDX(nextConfig);
