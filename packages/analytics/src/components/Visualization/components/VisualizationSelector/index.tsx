import React, {useMemo} from "react"
import {useVisualizationType} from "../VisualizationTypeProvider";
import {useAnalyticsData} from "../AnalyticsDataProvider";
import {CircularLoader} from "@dhis2/ui"
import {CustomPivotTable, CustomPivotTableOptions} from "../../../CustomPivotTable";
import {useLayout} from "../LayoutProvider";
import {mapValues} from "lodash";
import {Dimension} from "../DimensionsProvider";
import i18n from '@dhis2/d2-i18n';
import {ChartAnalytics, ChartConfig} from "../../../ChartAnalytics";
import {VisualizationConfig} from "../../index";

export interface VisualizationSelectorProps {
    config: VisualizationConfig;
}


export function getDimensionLabel(dimension: Dimension) {
    switch (dimension) {
        case "pe":
            return i18n.t("Period");
        case "ou":
            return i18n.t("Organisation unit");
        case "dx":
            return i18n.t("Data");
        default:
            return ""
    }
}


export function PivotTableRenderer({options}: { options: CustomPivotTableOptions }) {
    const [layout] = useLayout();
    const {analytics} = useAnalyticsData();


    const sanitizedLayout = useMemo(() => {
        return mapValues(layout, (dimension) => dimension.map(dimension => ({
            dimension,
            label: getDimensionLabel(dimension)
        })))
    }, [layout]);

    if (!analytics) {
        return null;
    }

    return <CustomPivotTable tableProps={{scrollHeight: "500"}} analytics={analytics}
                             config={{layout: sanitizedLayout, options}}/>;
}

export function ChartRenderer({options}: { options: ChartConfig }) {
    const {analytics} = useAnalyticsData();
    if (!analytics) {
        return null;
    }
    return <ChartAnalytics analytics={analytics} config={options}/>
}

export function VisualizationSelector({config}: VisualizationSelectorProps) {
    const [type] = useVisualizationType();
    const {analytics, loading} = useAnalyticsData();

    if (loading) {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <CircularLoader small/>
            </div>
        )
    }
    if (!analytics) {
        return null;
    }

    return (
        <div style={{width: "100%", height: "100%"}}>
            {type === "pivot-table" && (<PivotTableRenderer options={config?.pivotTable as CustomPivotTableOptions}/>)}
            {type === "chart" && (<ChartRenderer options={config?.chart as ChartConfig}/>)}
        </div>
    )
}
