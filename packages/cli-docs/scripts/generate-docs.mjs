import { generateFiles } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";

const openapi = createOpenAPI({
  input: ["./lib/api.json"],
});

generateFiles({
  input: openapi,
  output: "./content/docs",
  // we recommend to enable it
  // make sure your endpoint description doesn't break MDX syntax.
  includeDescription: true,
});
