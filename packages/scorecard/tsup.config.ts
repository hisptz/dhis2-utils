import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		...options,
		treeshake: true,
		legacyOutput: true,
		entry: [
			"src/**/*.{ts,tsx}",
			"src/**/*.js",
			"!src/**/*.stories.{ts,tsx}",
			"!src/**/*.test.ts",
			"!src/**/*.test.ts",
			"src/**/*.css",
		],
		ignoreWatch: ["*/**.stories.*"],
		splitting: true,
		sourcemap: true,
		clean: true,
		dts: false,
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
		bundle: false,
	};
});
