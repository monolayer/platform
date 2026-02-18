import { sdk } from "./index.js";
process.env.WORKFLOW_APP_HOST = "http://localhost:3000";

async function main() {
	const lala = await sdk.hello({ words: ["hello", "world"] });
	console.dir(lala, { depth: Infinity });
}

main().catch(console.error);
