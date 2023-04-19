import React from "react";
import {AnalyticsDimension} from "@hisptz/dhis2-utils";
import {VisualizationProvider} from "./components/VisualizationProvider";
import {Layout} from "./components/LayoutProvider";
import {VisualizationType} from "./components/VisualizationTypeProvider";
import {VisualizationTypeSelector} from "./components/VisualizationTypeSelector";
import {VisualizationDimensionSelector} from "./components/VisualizationDimensionSelector";

export interface VisualizationProps {
    layout: Layout,
    defaultVisualizationType: VisualizationType;
    dimensions: AnalyticsDimension
}

/**
 *  An analytics component that allows visualization of `chart`, `map`, and `pivot table` by passing analytics object and the default layout and type
 *
 * */

export function Visualization({dimensions, layout, defaultVisualizationType}: VisualizationProps) {
    return (
        <VisualizationProvider type={defaultVisualizationType} layout={layout} dimensions={dimensions}>
            <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: 16}}>
                <div style={{display: "flex", flexDirection: "row", gap: 16, justifyContent: "space-between"}}>
                    <VisualizationTypeSelector/>
                    <VisualizationDimensionSelector/>
                </div>
                <div style={{
                    height: 500,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <h4>Visualization here</h4>
                </div>
            </div>
        </VisualizationProvider>
    )
}
