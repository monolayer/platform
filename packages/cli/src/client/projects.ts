import { Effect } from "effect";

import { sendJson } from "./request.js";
import type { ClientRuntime } from "./runtime.js";
import type {
  ListProjectsInput,
  ListResult,
  ProjectDto,
  ProjectsApi,
} from "./types.js";

export const createProjectsApi = (runtime: ClientRuntime): ProjectsApi => {
  const list = (input?: ListProjectsInput) =>
    sendJson<ListResult<ProjectDto>>(runtime, {
      method: "GET",
      path: "/cli/projects",
      query: {
        cursor: input?.cursor,
        limit: input?.limit,
      },
    });

  return {
    list,
    listPromise: (input?: ListProjectsInput) => Effect.runPromise(list(input)),
  };
};
