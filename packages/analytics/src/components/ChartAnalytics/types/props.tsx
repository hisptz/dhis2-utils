import type { Analytics, LegendSet } from "@hisptz/dhis2-utils";
import {
	DashStyleValue,
	Options,
	YAxisOptions,
	YAxisPlotLinesLabelOptions,
} from "highcharts";
import HighchartsReact from "highcharts-react-official";

export type ChartType =
	| "column"
	| "pie"
	| "stacked-column"
	| "line"
	| "multi-series"
	| "bar"
	| "stacked-bar"
	| "gauge"
	| "area"
	| "stacked-area"
	| "radar"
	| "scatter";

export interface MultiSeriesConfig {
	series?: Array<{
		id: string;
		as: "column" | "line";
		cumulative?: boolean;
		yAxis?: number;
	}>;
	yAxes?: Array<YAxisOptions>;
	target?: TargetConfig;
}

export interface TargetConfig {
	id: string;
	value: number;
	label?: YAxisPlotLinesLabelOptions;
	styles: {
		color?: string;
		width?: number;
		dashStyle?: DashStyleValue;
		zIndex?: number;
	};
}

export type ChartConfig = {
	layout: {
		series: Array<string>;
		category: Array<string>;
		filter: Array<string>;
	};
	useShortNamesAsLabels?: boolean;
	type?: ChartType;
	height?: number;
	colors?: Array<string>;
	showFilterAsTitle?: boolean;
	customTitle?: string;
	name?: string;
	allowChartTypeChange?: boolean;
	highChartOverrides?:
		| Partial<Options>
		| ((config: Options) => Partial<Options>);
	multiSeries?: MultiSeriesConfig;
	legendSet?: LegendSet;
};

export type ChartAnalyticsProps = {
	analytics: Analytics;
	config: ChartConfig;
	setRef?: (ref: HighchartsReact.RefObject) => void;
	containerProps?: Record<string, any>;
};
