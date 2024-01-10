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
	],
	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-docs"),
	],
	framework: {
		name: "@storybook/react-vite",
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
						find: "ui",
						replacement: resolve(
							__dirname,
							"../../../packages/ui/",
						),
					},
				],
			},
		};
	},

	docs: {
		autodocs: true,
	},
};

export default config;
