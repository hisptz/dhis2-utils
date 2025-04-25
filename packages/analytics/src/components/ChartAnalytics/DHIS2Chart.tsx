import { uid } from "@hisptz/dhis2-utils";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { forwardRef, useRef } from "react";
import { useChart } from "./hooks/useChart.js";
import "./styles/custom-highchart.css";
import "highcharts/modules/exporting";
import "highcharts/modules/export-data";
import "highcharts/modules/full-screen";
import "highcharts/highcharts-more";
import "highcharts/modules/solid-gauge";
import "highcharts/modules/accessibility";
import { ChartAnalyticsProps } from "./types/props.js";

export * from "./services/export.js";
export * from "./types/props.js";
export * from "./components/DownloadMenu/index.js";

function ChartAnalyticsComponent({
	analytics,
	config,
	containerProps,
	setRef,
}: ChartAnalyticsProps) {
	const id = useRef(`${uid()}-chart-item`);
	const { chart } = useChart({ id: id.current, analytics, config });

	if (!chart) {
		return null;
	}
	return (
		<HighchartsReact
			immutable
			ref={setRef}
			containerProps={{
				id: id.current,
				style: { width: "100%", height: "100%" },
				...(containerProps ?? {}),
			}}
			highcharts={Highcharts}
			options={{ ...chart }}
		/>
	);
}

/**
 * The `DHIS2Chart` component allows you to render a chart visualization from DHIS2 analytics data.
 * It accepts the DHIS2 analytics payload as well as configuration on how to visualize the data.
 *
 * @component
 *
 * @param {ChartAnalyticsProps} props
 * @param {Analytics} [props.analytics] - Analytics data from DHIS2
 * @param {ChartConfig} [props.config] - Visualization configuration. See stories for more information
 * @param {Record<string, any>} [props.containerProps] - Props that will be passed to the chart container
 * @param {forwardRef} forwardRef - A function that creates a higher order component that forwards the ref through the component tree.
 *
 * @returns {React.ForwardRefExoticComponent<ChartAnalyticsProps>} - The DHIS2 chart component with forward ref support.
 */
export const DHIS2Chart: React.ForwardRefExoticComponent<ChartAnalyticsProps> =
	forwardRef<HighchartsReact.RefObject, ChartAnalyticsProps>(
		ChartAnalyticsComponent,
	);

/**
 * @deprecated since `v2`. Use `DHIS2Chart` instead
 * */
export const ChartAnalytics = DHIS2Chart;
