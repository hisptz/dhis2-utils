import React from "react";
import { AnalyticsDimension } from "@hisptz/dhis2-utils";
import { VisualizationProvider } from "./components/VisualizationProvider/index.js";
import { Layout } from "./components/LayoutProvider/index.js";
import { VisualizationType } from "./components/VisualizationTypeProvider/index.js";
import { VisualizationTypeSelector } from "./components/VisualizationTypeSelector/index.js";
import { VisualizationDimensionSelector } from "./components/VisualizationDimensionSelector/index.js";
import { VisualizationSelector } from "./components/VisualizationSelector/index.js";
import { DHIS2PivotTableOptions } from "../DHIS2PivotTable/index.js";
import { ChartConfig } from "../ChartAnalytics/index.js";
import { MapProps } from "../Map/index.js";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import i18n from "@dhis2/d2-i18n";
import { Button, colors, IconError24 } from "@dhis2/ui";

export interface VisualizationConfig {
	pivotTable?: DHIS2PivotTableOptions;
	chart?: ChartConfig;
	map?: Omit<MapProps, "orgUnitSelection" | "periodSelection">;
}

export interface VisualizationProps {
	layout: Layout;
	defaultVisualizationType: VisualizationType;
	dimensions: AnalyticsDimension;
	config: VisualizationConfig;
	height?: number;
	showToolbar?: boolean;
	showPeriodSelector?: boolean;
	showOrgUnitSelector?: boolean;
}

/**
 *  An analytics component that allows visualization of `chart`, `map`, and `pivot table` by passing analytics object and the default layout and type
 *
 * */

function ErrorFallback({
	error,
	resetErrorBoundary,
	height,
}: FallbackProps & { height?: number }) {
	return (
		<div
			style={{
				width: "100%",
				textAlign: "center",
				height: height ?? 500,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 16,
				padding: 16,
			}}
		>
			<IconError24 />
			<h3
				style={{
					color: colors.grey800,
					margin: 0,
				}}
			>
				{i18n.t("Could not load visualization")}
			</h3>
			<p style={{ margin: 0 }}>{error.message}</p>
			{resetErrorBoundary && (
				<Button onClick={resetErrorBoundary} small>
					{i18n.t("Try again")}
				</Button>
			)}
		</div>
	);
}

export function Visualization({
	dimensions,
	layout,
	defaultVisualizationType,
	config,
	height,
	showToolbar,
	showOrgUnitSelector,
	showPeriodSelector,
}: VisualizationProps) {
	return (
		<ErrorBoundary
			resetKeys={[dimensions, layout, defaultVisualizationType, config]}
			fallbackRender={(props) =>
				(<ErrorFallback height={height} {...props} />) as any
			}
		>
			<VisualizationProvider
				config={config}
				type={defaultVisualizationType}
				layout={layout}
				dimensions={dimensions}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						height: "100%",
						gap: 16,
					}}
				>
					{showToolbar && (
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: 16,
								justifyContent: "space-between",
							}}
						>
							<VisualizationTypeSelector />
							<VisualizationDimensionSelector
								showPeriodSelector={showPeriodSelector}
								showOrgUnitSelector={showOrgUnitSelector}
							/>
						</div>
					)}
					<>
						<VisualizationSelector config={config} />
					</>
				</div>
			</VisualizationProvider>
		</ErrorBoundary>
	);
}
