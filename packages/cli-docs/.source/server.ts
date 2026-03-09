// @ts-nocheck
import * as __fd_glob_6 from "../content/docs/cli/cli-projects-list.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/cli/cli-deployments-deploy.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/overview.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/authentication.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/cli/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../lib/source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "cli/meta.json": __fd_glob_1, }, {"authentication.mdx": __fd_glob_2, "installation.mdx": __fd_glob_3, "overview.mdx": __fd_glob_4, "cli/cli-deployments-deploy.mdx": __fd_glob_5, "cli/cli-projects-list.mdx": __fd_glob_6, });