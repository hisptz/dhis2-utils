import Highcharts, {
	PlotOptions,
	SeriesOptionsType,
	XAxisOptions,
	type YAxisOptions,
} from "highcharts";
import { get, head } from "lodash";
import { DHIS2Chart } from "./index.js";
import { getColorFromLegendSet } from "../../Map/utils/map";

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
		const { rows, headers, metaData } = this.analytics;
		const valueHeaderIndex = headers!.findIndex(
			({ name }) => name === "value",
		);
		return parseFloat(get(head(rows), [valueHeaderIndex]) ?? "");
	}

	getSeries(): SeriesOptionsType[] {
		const value = this.getValue();
		return [
			{
				name: this.id,
				data: [Math.round(value ?? 0)],
				color: "white",
				dataLabels: {
					y: -70,
					style: {
						fontSize: "48px",
					},
					align: "center",
					verticalAlign: "end",
					format: "{y}%",
				},
				compare: "percent",
				tooltip: {
					valueSuffix: "%",
				},
			},
		] as Highcharts.SeriesGaugeOptions[];
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
			} as Highcharts.YAxisOptions,
		];
	}

	getXAxis(): XAxisOptions | undefined {
		return undefined;
	}
}
