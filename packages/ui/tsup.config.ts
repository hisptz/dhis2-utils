import { defineConfig } from "tsup";

export default defineConfig((options) => {
	const devMode = options.watch === true;
	return {
		...options,
		entry: ["src/index.ts", "src/tables/index.ts"],
		ignoreWatch: ["*/**.stories.*"],
		splitting: false,
		sourcemap: false,
		clean: true,
		dts: !devMode,
		format: ["esm", "cjs"],
		external: [
			"react",
			"react-dom",
			"@dhis2/app-runtime",
			"@dhis2/d2-i18n",
			"@dhis2/ui",
			"classnames",
			"eslint",
			"lodash",
			"react",
			"recoil",
			"usehooks-ts",
		],
		bundle: !devMode,
	};
});
