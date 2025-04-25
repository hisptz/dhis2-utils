import { DHIS2LineChart } from "./line";

export class DHIS2RadarChart extends DHIS2LineChart {
	getChartConfig(): any {
		return {
			...super.getChartConfig(),
			polar: true,
		};
	}
}
