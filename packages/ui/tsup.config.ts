import {defineConfig} from "tsup";

export default defineConfig({
		entry: {
				".": "src/index.ts",
				CustomDataTable: "src/CustomDataTable/index.ts"
		}
})
