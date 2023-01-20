
// @ts-ignore

module.exports = {
    stories: [
        {
            directory: "../../ui/src",
            titlePrefix: "Core UI components",
            files: "**/*.stories.*"
        },
        {
            directory: "../../analytics/src",
            titlePrefix: "Analytics components",
            files: "**/*.stories.*"
        },

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
