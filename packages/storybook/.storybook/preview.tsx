import {Provider} from "@dhis2/app-runtime";
import React from "react";
import hispTheme from "./theme";

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
    (Story: any) => (
        <React.StrictMode>
            <DHIS2Provider>
                <Story/>
            </DHIS2Provider>
        </React.StrictMode>
    ),
];
