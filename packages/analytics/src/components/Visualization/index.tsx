import React from "react";
import {AnalyticsDimension} from "@hisptz/dhis2-utils";
import {VisualizationProvider} from "./components/VisualizationProvider";
import {Layout} from "./components/LayoutProvider";
import {VisualizationType} from "./components/VisualizationTypeProvider";
import {VisualizationTypeSelector} from "./components/VisualizationTypeSelector";
import {VisualizationDimensionSelector} from "./components/VisualizationDimensionSelector";
import {VisualizationSelector} from "./components/VisualizationSelector";
import {CustomPivotTableOptions} from "../CustomPivotTable";
import {ChartConfig} from "../ChartAnalytics";
import {MapProps} from "../Map";

export interface VisualizationConfig {
    pivotTable?: CustomPivotTableOptions;
    chart?: ChartConfig;
    map?: Omit<MapProps, "orgUnitSelection" | "periodSelection">
}

export interface VisualizationProps {
    layout: Layout,
    defaultVisualizationType: VisualizationType;
    dimensions: AnalyticsDimension;
    config: VisualizationConfig;
    height?: number
}

/**
 *  An analytics component that allows visualization of `chart`, `map`, and `pivot table` by passing analytics object and the default layout and type
 *
 * */

export function Visualization({dimensions, layout, defaultVisualizationType, config, height}: VisualizationProps) {
    return (
        <VisualizationProvider type={defaultVisualizationType} layout={layout} dimensions={dimensions}>
            <div
                style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 16, gap: 16}}>
                <div style={{display: "flex", flexDirection: "row", gap: 16, justifyContent: "space-between"}}>
                    <VisualizationTypeSelector/>
                    <VisualizationDimensionSelector/>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: height ?? 500
                }}>
                    <VisualizationSelector height={height ?? 500} config={config}/>
                </div>
            </div>
        </VisualizationProvider>
    )
}
