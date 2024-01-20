import { uid } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { forwardRef, useRef } from "react";
import { useChart } from "./hooks/useChart";
import "./styles/custom-highchart.css";
import { ChartAnalyticsProps } from "./types/props";

export * from "./services/export";
export * from "./types/props";
export * from "./components/DownloadMenu";

function ChartAnalyticsComponent(
	{ analytics, config, containerProps }: ChartAnalyticsProps,
	ref: React.ForwardedRef<HighchartsReact.RefObject>,
) {
	const id = useRef(`${uid()}-chart-item`);
	const { chart } = useChart({ id: id.current, analytics, config });

	if (!chart) {
		return null;
	}
	return (
		<HighchartsReact
			immutable
			ref={ref}
			containerProps={{ id: id.current, ...(containerProps ?? {}) }}
			highcharts={HighCharts}
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
 * @returns {React.FC<ChartAnalyticsProps & { ref: React.Ref<unknown> }>} - The DHIS2 chart component with forward ref support.
 */
export const DHIS2Chart: React.FC<ChartAnalyticsProps> = forwardRef(
	ChartAnalyticsComponent,
);

/**
 * @deprecated since `v2`. Use `DHIS2Chart` instead
 * */
export const ChartAnalytics = DHIS2Chart;
