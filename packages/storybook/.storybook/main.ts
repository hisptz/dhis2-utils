import type {StorybookConfig} from '@storybook/react-vite';
import path from "path";

export const config: StorybookConfig = {
    stories: [{
        directory: "../src/ui",
        titlePrefix: "Core UI",
        files: "**/*.stories.*"
    }, {
        directory: "../src/analytics",
        titlePrefix: "Analytics",
        files: "**/*.stories.*"
    }],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", "@storybook/addons",
        {
            name: '@storybook/addon-docs',
            options: {
                sourceLoaderOptions: {
                    injectStoryParameters: false,
                },
            },
        },
        {
            name: '@storybook/addon-storysource',
            options: {
                sourceLoaderOptions: {
                    injectStoryParameters: false,
                },
                rule: {
                    // test: [/\.stories\.jsx?$/], This is default
                    include: [path.resolve(__dirname, '../src')], // You can specify directories
                },
                loaderOptions: {
                    prettierConfig: {printWidth: 80, singleQuote: false},
                },
            },
        }],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    core: {},
    // async viteFinal(config: any) {
    //     const newConfig = (await import('../vite.config')).default;
    //     return mergeConfig(config, newConfig);
    // },
    docs: {
        autodocs: true
    },
    staticDirs: [
        "./public"
    ]
};
export default config;
