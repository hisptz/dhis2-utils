import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		...options,
		treeshake: true,
		entry: [
			"src/**/*.{ts,tsx}",
			"!src/**/*.stories.ts",
			"!src/**/*.test.ts",
			"!src/**/*.test.ts",
			"src/**/*.css",
		],
		ignoreWatch: ["*/**.stories.*"],
		splitting: false,
		sourcemap: true,
		clean: true,
		dts: false,
		minify: !options.watch,
		format: ["esm"],
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
