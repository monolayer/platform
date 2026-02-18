import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default [
	{
		ignores: [
			"**/node_modules/**/*",
			"**/cdk.out/**/*",
			"**/dist/**/*",
			"**files/**/*",
			"**/build/**",
		],
	},
	...compat.config({
		env: {
			browser: true,
			es2021: true,
			node: true,
		},
		extends: [
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"prettier",
		],
		overrides: [
			{
				env: {
					node: true,
				},
				files: [".eslintrc.{js,cjs}"],
				parserOptions: {
					sourceType: "script",
				},
			},
		],
		ignorePatterns: [
			"**/node_modules/**",
			"**/dist/**",
			"**/coverage/**",
			"**/tmp/**",
			"files/**",
			"**/docs/**",
		],
		parser: "@typescript-eslint/parser",
		parserOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		plugins: ["@typescript-eslint"],
		rules: {
			indent: ["off", "tab"],
			"linebreak-style": ["error", "unix"],
			quotes: ["off", "double"],
			semi: ["off", "always"],
			"max-lines": [
				"error",
				{ max: 300, skipComments: true, skipBlankLines: true },
			],
			complexity: ["error"],
		},
	}),
];
