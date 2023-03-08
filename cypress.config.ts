import {defineConfig} from "cypress";

export default defineConfig({
    component: {
        specPattern: [
            "packages/ui/**/*.test.{ts,tsx}",
            "packages/analytics/**/*.test.{ts,tsx}"
        ],
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },
});
