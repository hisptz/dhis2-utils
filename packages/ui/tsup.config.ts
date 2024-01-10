import { defineConfig } from "tsup";

export default defineConfig((options) => {
	const devMode = options.watch === true;
	return {
		...options,
		entry: ["src/index.ts", "src/"],
		splitting: !devMode,
		clean: true,
		dts: !devMode,
		format: ["esm", "cjs"],
		bundle: !devMode,
	};
});
