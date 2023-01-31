import {uid} from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, {forwardRef, useRef} from "react";
import {useChart} from "./hooks/useChart";
import "./styles/custom-highchart.css";
import {ChartAnalyticsProps} from "./types/props";

export * from "./services/export";
export * from "./types/props"
export * from "./components/DownloadMenu"

function ChartAnalyticsComponent({
                                     analytics,
                                     config,
                                     containerProps
                                 }: ChartAnalyticsProps, ref: React.ForwardedRef<HighchartsReact.RefObject>) {
    const id = useRef(`${uid()}-chart-item`);
    const {chart} = useChart({id: id.current, analytics, config});

    if (!chart) {
        return null;
    }
    return <HighchartsReact immutable ref={ref} containerProps={{id: id.current, ...(containerProps ?? {})}}
                            highcharts={HighCharts} options={{...chart}}/>;
}

export const ChartAnalytics: React.FC<ChartAnalyticsProps> = forwardRef(ChartAnalyticsComponent);
