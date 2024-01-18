import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		...options,
		treeshake: true,
		ignoreWatch: ["*/**.stories.*"],
		entry: [
			"./src/**/*.{ts,tsx}",
			"!./src/**/*.stories.ts",
			"!./src/**/*.test.ts",
		],
		splitting: false,
		sourcemap: true,
		clean: true,
		dts: true,
		format: ["esm", "cjs"],
		external: ["@dhis2/d2-i18n", "lodash", "usehooks-ts"],
		bundle: false,
	};
});
