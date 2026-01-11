import { buildSDK } from "./build-sdk.js";
import type { deploy } from "./types/apps/control-plane/src/workflows/deploy-app-environment.js";
import type { hello } from "./types/apps/control-plane/src/workflows/draft.js";
import type { handleUserSignup } from "./types/apps/control-plane/src/workflows/user-signup.js";

type Workflows = {
	handleSignUp: typeof handleUserSignup;
	hello: typeof hello;
	deploy: typeof deploy;
};

const WorkflowPaths: Record<keyof Workflows, string> = {
	handleSignUp: "src/workflows/user-signup.ts",
	hello: "src/workflows/draft.ts",
	deploy: "src/workflows/deploy-app-environment.ts",
};

export const sdk = buildSDK<Workflows>(WorkflowPaths);

export default sdk;
