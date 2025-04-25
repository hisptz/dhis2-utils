import { PlotOptions, SeriesOptionsType } from "highcharts";
import { getPointSeries } from "../utils/chart.js";
import { DHIS2LineChart } from "./line";

export class DHIS2AreaChart extends DHIS2LineChart {
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
