/**
 * @type {import("prettier").Config}
 */
const base = {
	trailingComma: "all",
	useTabs: true,
	tabWidth: 2,
	semi: true,
	singleQuote: false,
	plugins: ["prettier-plugin-organize-imports"],
};
export default base;
