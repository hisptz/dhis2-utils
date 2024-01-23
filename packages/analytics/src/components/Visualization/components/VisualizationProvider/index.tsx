import React from "react";
import { Layout, LayoutProvider } from "../LayoutProvider/index.js";
import { AnalyticsDimension } from "@hisptz/dhis2-utils";
import { DimensionsProvider } from "../DimensionsProvider/index.js";
import { AnalyticsDataProvider } from "../AnalyticsDataProvider/index.js";
import {
	VisualizationType,
	VisualizationTypeProvider,
} from "../VisualizationTypeProvider/index.js";
import { VisualizationConfig } from "../../index.js";

export interface VisualizationProviderProps {
	children: React.ReactNode;
	layout: Layout;
	dimensions: AnalyticsDimension;
	type: VisualizationType;
	config: VisualizationConfig;
}

export function VisualizationProvider({
	layout,
	dimensions,
	children,
	type,
	config,
}: VisualizationProviderProps) {
	return (
		<DimensionsProvider dimensions={dimensions}>
			<VisualizationTypeProvider config={config} defaultType={type}>
				<LayoutProvider defaultLayout={layout}>
					<AnalyticsDataProvider>{children}</AnalyticsDataProvider>
				</LayoutProvider>
			</VisualizationTypeProvider>
		</DimensionsProvider>
	);
}
