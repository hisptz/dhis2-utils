import type {StorybookConfig} from '@storybook/react-vite';

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
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", "@storybook/addon-mdx-gfm", "@storybook/addons", 'storybook-addon-jsx'],
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
        autodocs: false
    },
    staticDirs: [
        "./public"
    ]
};
export default config;
