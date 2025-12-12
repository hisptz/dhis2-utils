import { Provider } from "@dhis2/app-runtime";
import { CssReset } from "@dhis2/ui";
import React, { type ReactNode } from "react";
import hispTheme from "./theme";
import "./style.css";

export const parameters = {
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

const baseUrl =
	// @ts-ignore
	import.meta.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8080";

const appConfig = {
	baseUrl,
	apiVersion:
		// @ts-ignore
		parseInt(import.meta.env.STORYBOOK_DHIS2_API_VERSION ?? "38") ?? 38,
};

const DHIS2Provider = ({ children }: { children: ReactNode }) => (
	<Provider
		plugin={false}
		showAlertsInPlugin
		config={appConfig}
		parentAlertsAdd={<div />}
	>
		{children}
	</Provider>
);

export const decorators = [
	(Story: any) => (
		<React.StrictMode>
			<DHIS2Provider>
				<CssReset />
				<div
					style={{
						width: "100%",
						minHeight: 1000,
						minWidth: 800,
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Story />
				</div>
			</DHIS2Provider>
		</React.StrictMode>
	),
];
export const tags = ["autodocs"];
