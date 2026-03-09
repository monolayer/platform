// lib/source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import {
  createFileSystemGeneratorCache,
  createGenerator,
  remarkAutoTypeTable
} from "fumadocs-typescript";
var generator = createGenerator({
  // recommended: choose a directory for cache
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript")
});
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]]
  }
});
export {
  source_config_default as default,
  docs
};
