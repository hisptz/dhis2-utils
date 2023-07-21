import {PlotOptions} from "highcharts";
import {DHIS2ColumnChart} from "./column";

export class DHIS2BarChart extends DHIS2ColumnChart {
    getHighchartsType(): string {
        return "bar";
    }

}

export class DHIS2StackedBarChart extends DHIS2BarChart {
    getPlotOptions(): PlotOptions {
        return {
            column: {
                stacking: "normal",
                ...super.getPlotOptions().column,
            },
        };
    }
}
