import { dirname, join, resolve } from "path";
import { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(value: string) {
	return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
	stories: [
		{
			directory: resolve(__dirname, "../../../packages/ui/src"),
			files: "**/*.stories.tsx",
			titlePrefix: "UI",
		},
		{
			directory: resolve(__dirname, "../../../packages/analytics/src"),
			files: "**/*.stories.tsx",
			titlePrefix: "Analytics UI",
		},
		{
			directory: resolve(__dirname, "../../../packages/scorecard/src"),
			files: "**/*.stories.tsx",
			titlePrefix: "Scorecard",
		},
	],
	typescript: {
		// Overrides the default Typescript configuration to allow multi-package components to be documented via Autodocs.
		reactDocgen: "react-docgen",
		check: false,
	},
	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-interactions"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-coverage"),
		"@chromatic-com/storybook",
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},

	core: {},

	async viteFinal(config: any, { configType }: any) {
		// customize the Vite config here
		return {
			...config,
			define: { "process.env": {} },
			resolve: {
				alias: [
					{
						find: "utils",
						replacement: resolve(
							__dirname,
							"../../../packages/utils/",
						),
					},
					{
						find: "ui",
						replacement: resolve(
							__dirname,
							"../../../packages/ui/",
						),
					},
					{
						find: "analytics",
						replacement: resolve(
							__dirname,
							"../../../packages/analytics/",
						),
					},
				],
			},
		};
	},

	docs: {},
};

export default config;
