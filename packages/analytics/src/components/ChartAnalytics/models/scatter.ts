import { DHIS2LineChart } from "./line";
import { SeriesOptionsType } from "highcharts";
import { getPointSeries } from "../utils/chart";

export class DHIS2ScatterChart extends DHIS2LineChart {
	getHighchartsType(): string {
		return "scatter";
	}

	getSeries(): SeriesOptionsType[] {
		return getPointSeries(this.analytics, this.config, "scatter");
	}
}
