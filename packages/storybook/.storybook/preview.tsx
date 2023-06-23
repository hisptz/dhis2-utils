import {Provider} from "@dhis2/app-runtime";
import {CssReset} from "@dhis2/ui"
import React from "react";
import hispTheme from "./theme";
import "../common.css"
import {jsxDecorator} from 'storybook-addon-jsx'

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    docs: {
        theme: hispTheme,
    },
};

// @ts-ignore
const baseUrl = import.meta.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8080";


const appConfig = {
    baseUrl,
    // @ts-ignore
    apiVersion: parseInt(import.meta.env.STORYBOOK_DHIS2_API_VERSION ?? "38") ?? 38,
};
const DHIS2Provider = ({children}: { children: any }) => <Provider config={appConfig}>{children}</Provider>;

export const decorators = [
    jsxDecorator(),
    (Story: any) => (
        <React.StrictMode>
            <DHIS2Provider>
                <CssReset/>
                <div style={{
                    width: "100%",
                    minHeight: 800,
                    minWidth: 500,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Story/>
                </div>
            </DHIS2Provider>
        </React.StrictMode>
    ),
];
