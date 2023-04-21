import type {StorybookConfig} from '@storybook/react-vite';

export const config: StorybookConfig = {
    stories: [{
        directory: "../../ui/src",
        titlePrefix: "Core UI components",
        files: "**/*.stories.*"
    }, {
        directory: "../../analytics/src",
        titlePrefix: "Analytics components",
        files: "**/*.stories.*"
    }],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app", "@storybook/addon-mdx-gfm"],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    core: {
        builder: '@storybook/builder-vite', // 👈 The builder enabled here.
    },
    // async viteFinal(config: any) {
    //     const newConfig = (await import('../vite.config')).default;
    //     return mergeConfig(config, newConfig);
    // },
    docs: {
        autodocs: true
    }
};
export default config;
