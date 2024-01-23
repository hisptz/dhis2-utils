import type { Analytics } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import { ChartConfig } from "../types/props.js";

export abstract class DHIS2Chart {
	id: string;
	analytics: Analytics;
	config: ChartConfig;

	constructor(id: string, analytics: Analytics, config: ChartConfig) {
		this.id = id;
		this.analytics = analytics;
		this.config = config;
	}

	abstract getHighchartsType(): string;

	getChartConfig(): HighCharts.ChartOptions & any {
		return {
			renderTo: this.id,
			zoomType: "xy",
			type: this.getHighchartsType(),
			height: this.config?.height,
			styledMode: false,
		};
	}

	getOptions(): HighCharts.Options {
		const options = {
			yAxis: this.getYAxis(),
			chart: this.getChartConfig(),
			colors: this.config?.colors ?? [
				"#a8bf24",
				"#518cc3",
				"#d74554",
				"#ff9e21",
				"#968f8f",
				"#ba3ba1",
				"#ffda54",
				"#45beae",
				"#b98037",
				"#676767",
				"#6b2dd4",
				"#47792c",
				"#fcbdbd",
				"#830000",
				"#a5ffc0",
				"#000078",
				"#817c00",
				"#bdf023",
				"#fffac4",
			],
			series: this.getSeries(),
			plotOptions: this.getPlotOptions(),
			title: { text: "" },
			xAxis: this.getXAxis(),
			exporting: this.getExporting(),
			legend: { enabled: true },
			credits: { enabled: false },
		};

		let overrides = {};

		if (this.config?.highChartOverrides) {
			overrides = {
				...(typeof this.config?.highChartOverrides === "object"
					? this.config?.highChartOverrides ?? {}
					: this.config?.highChartOverrides(options)),
			};
		}

		return {
			...options,
			...overrides,
		};
	}

	abstract getSeries(): HighCharts.SeriesOptionsType[];

	abstract getPlotOptions(): HighCharts.PlotOptions;

	abstract getXAxis(): HighCharts.XAxisOptions | undefined;

	getYAxis(): HighCharts.YAxisOptions[] {
		return [
			{
				title: {
					text: "",
					style: {
						color: "#000000",
						fontWeight: "normal",
						fontSize: "14px",
					},
				},
				labels: {
					enabled: true,
					style: {
						color: "#000000",
						fontWeight: "normal",
						fontSize: "14px",
					},
				},
				plotLines: [
					{
						color: "#000000",
						dashStyle: "Solid",
						width: 2,
						zIndex: 1000,
						label: { text: "" },
					},
					{
						color: "#bbbbbb",
						dashStyle: "Solid",
						zIndex: 1000,
						width: 2,
						label: { text: "" },
					},
				],
			},
		];
	}

	getExporting(): HighCharts.ExportingOptions {
		const name = this.config?.name ?? "chart";
		return {
			filename: `${name}`,
			sourceWidth: 1200,
			buttons: {
				contextButton: {
					enabled: false,
				},
			},
		};
	}
}
