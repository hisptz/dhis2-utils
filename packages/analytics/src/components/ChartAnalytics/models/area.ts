import { PlotOptions, SeriesOptionsType, XAxisOptions } from "highcharts";
import { getAllCategories, getPointSeries } from "../utils/chart.js";
import { DHIS2Chart } from "./index.js";

export class DHIS2AreaChart extends DHIS2Chart {
	getHighchartsType(): string {
		return "area";
	}

	getPlotOptions(): PlotOptions {
		return {
			area: {},
		};
	}

	getSeries(): SeriesOptionsType[] {
		return getPointSeries(this.analytics, this.config, "area");
	}

	getXAxis(): XAxisOptions | undefined {
		return {
			type: "category",
			categories: getAllCategories(this.analytics, this.config),
			crosshair: true,
			labels: {
				enabled: true,
			},
			title: { text: "" },
		};
	}
}

export class DHISStackedAreaChart extends DHIS2AreaChart {
	getPlotOptions(): PlotOptions {
		return {
			area: {
				stacking: "normal",
				...super.getPlotOptions().area,
			},
		};
	}
}
