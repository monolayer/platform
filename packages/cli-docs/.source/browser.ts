// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../lib/source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"authentication.mdx": () => import("../content/docs/authentication.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "overview.mdx": () => import("../content/docs/overview.mdx?collection=docs"), "commands/cli-deployments-deploy.mdx": () => import("../content/docs/commands/cli-deployments-deploy.mdx?collection=docs"), "commands/cli-projects-list.mdx": () => import("../content/docs/commands/cli-projects-list.mdx?collection=docs"), }),
};
export default browserCollections;