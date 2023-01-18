module.exports = {
    stories: [
        "../../ui/src/**/*.stories.mdx",
        "../../ui/src/**/*.stories.@(js|jsx|ts|tsx)",
        "../../analytics/src/**/*.stories.mdx",
        "../../analytics/src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-create-react-app"
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-vite"
    }
}
