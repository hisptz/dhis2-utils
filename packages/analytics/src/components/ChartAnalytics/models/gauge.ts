import {
	type PaneBackgroundOptions,
	type PaneOptions,
	PlotOptions,
	SeriesGaugeOptions,
	SeriesOptionsType,
	XAxisOptions,
	type YAxisOptions,
} from "highcharts";
import { get, head } from "lodash";
import { DHIS2Chart } from "./index.js";
import { getColorFromLegendSet } from "../../Map/utils/map";
import { colors } from "@dhis2/ui";

const DEFAULT_PANE_SIZE = "100%";
const DEFAULT_FONT_SIZE = "28px";

export class DHIS2GaugeChart extends DHIS2Chart {
	getHighchartsType(): string {
		return "solidgauge";
	}

	getPlotOptions(): PlotOptions {
		return {
			solidgauge: {
				borderRadius: 4,
				color: head(this.config.colors),
				dataLabels: {
					y: 5,
					borderWidth: 0,
					useHTML: true,
				},
				borderWidth: 0,
				borderColor: "white",
				innerRadius: "60%",
			},
		} as Highcharts.PlotOptions;
	}

	getValue(): number | undefined {
		const { rows, headers } = this.analytics;
		const valueHeaderIndex = headers!.findIndex(
			({ name }) => name === "value",
		);
		return parseFloat(get(head(rows), [valueHeaderIndex]) ?? "");
	}

	getPane(): PaneOptions | undefined {
		return {
			center: ["50%", "85%"],
			size: DEFAULT_PANE_SIZE,
			startAngle: -90,
			endAngle: 90,
			background: [
				{
					backgroundColor: "transparent",
					innerRadius: "60%",
					outerRadius: "100%",
					shape: "arc",
				} as PaneBackgroundOptions,
			],
		};
	}

	getSeries(): SeriesOptionsType[] {
		const value = this.getValue();
		return [
			{
				name: this.id,
				data: [Math.round(value ?? 0)],
				color: "white",
				enableMouseTracking: false,
				dataLabels: {
					y: 0,
					borderWidth: 0,
					verticalAlign: "bottom",
					style: {
						fontSize: DEFAULT_FONT_SIZE,
						color: colors.grey900,
					},
				},
				compare: "percent",
				tooltip: {
					valueSuffix: "%",
				},
			},
		] as unknown as SeriesGaugeOptions[];
	}

	getYAxis(): YAxisOptions[] {
		const chartColors = this.config.colors ?? [];
		const legendSet = this.config.legendSet;
		const legendColor = legendSet
			? getColorFromLegendSet(legendSet?.legends, this.getValue())
			: undefined;
		return [
			{
				min: 0,
				max: 100,
				offset: 0,
				lineWidth: 0,
				minorTicks: false,
				tickWidth: 0,
				type: "linear",
				labels: {
					enabled: false,
					distance: 20,
					style: {
						fontSize: "14px",
					},
				},
				maxPadding: 0,
				pane: 0,
				minColor: legendColor ?? head(chartColors),
				maxColor: legendColor ?? head(chartColors),
				margin: 0,
			} as YAxisOptions,
		];
	}

	getXAxis(): XAxisOptions | undefined {
		return undefined;
	}
}
