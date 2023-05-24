// Note: type annotations allow type checking and IDEs autocompletion
// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require("path")
/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'DHIS2 Utils Documentation',
    tagline: 'Reusable utilities for DHIS2',
    url: 'https://dev.hisptz.com',
    baseUrl: '/docs',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'hisptz', // Usually your GitHub org/user name.
    projectName: 'dhis2-utils', // Usually your repo name.
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/hisptz/dhis2-utils/tree/main/packages/docs/docs',

                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/hisptz/dhis2-utils/tree/main/packages/docs/blog',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    trailingSlash: false,
    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'DHIS2 Utils',
                logo: {
                    alt: 'hisp-tz',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Docs',
                    },
                    {
                        to: "api",
                        label: "API References",
                        position: "left"
                    },
                    {
                        href: 'https://github.com/hisptz/dhis2-utils',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'light',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'DHIS2 Utilities',
                                to: '/docs/intro',
                            },
                            {
                                label: 'UI Components',
                                to: '/docs/ui',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/hisptanzania',
                            },
                            {
                                label: 'LinkedIn',
                                href: 'https://www.linkedin.com/company/hisptanzania',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/hisptz',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} HISP Tanzania, Inc. Built with Docusaurus.`,
            },
            // prism: {
            //     theme: lightCodeTheme,
            //     darkTheme: darkCodeTheme,
            // },
        }),
    plugins: [
        () => ({
            name: 'resolve-react',
            configureWebpack() {
                return {
                    resolve: {
                        alias: {
                            // assuming root node_modules is up from "./packages/<your-docusaurus>
                            react: path.resolve('../../node_modules/react'),
                        },
                    },
                };
            },
        }),
        [
            'docusaurus-plugin-typedoc-api',
            {
                projectRoot: path.join(__dirname, "../.."),
                banner: "API References",
                packages: [
                    "packages/ui",
                    "packages/lib",
                    "packages/analytics"
                ]
            }
        ]
    ]
};

module.exports = config;
