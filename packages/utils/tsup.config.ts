import { defineConfig } from "tsup";

export default defineConfig((options) => {
	const devMode = options.watch === true;
	return {
		...options,
		ignoreWatch: ["*/**.stories.*"],
		entry: [
			"./src/**/*.{ts,tsx}",
			"!./src/**/*.stories.ts",
			"!./src/**/*.test.ts",
		],
		splitting: false,
		sourcemap: false,
		clean: true,
		dts: true,
		format: ["esm", "cjs"],
		external: ["@dhis2/d2-i18n", "lodash", "usehooks-ts"],
		bundle: false,
	};
});
