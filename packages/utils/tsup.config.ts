import { defineConfig } from "tsup";

export default defineConfig((options) => {
	return {
		...options,
		treeshake: true,
		legacyOutput: true,
		ignoreWatch: ["*/**.stories.*"],
		entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.ts"],
		splitting: false,
		sourcemap: true,
		clean: !options.watch,
		dts: false,
		format: ["esm", "cjs"],
		external: ["@dhis2/d2-i18n", "lodash", "usehooks-ts"],
		bundle: false,
	};
});
