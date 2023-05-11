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
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import i18n from '@dhis2/d2-i18n';
import {Button, colors, IconError24} from "@dhis2/ui"

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
    height?: number;
    showToolbar?: boolean
}

/**
 *  An analytics component that allows visualization of `chart`, `map`, and `pivot table` by passing analytics object and the default layout and type
 *
 * */


function ErrorFallback({error, resetErrorBoundary, height}: FallbackProps & { height?: number }) {
    return <div style={{
        width: "100%",
        textAlign: "center",
        height: height ?? 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 16,
    }}>
        <IconError24/>
        <h3 style={{
            color: colors.grey800,
            margin: 0
        }}>{i18n.t("Could not load visualization")}</h3>
        <p style={{margin: 0}}>
            {error.message}
        </p>
        {
            resetErrorBoundary && <Button onClick={resetErrorBoundary} small>{i18n.t("Try again")}</Button>
        }
    </div>
}

export function Visualization({
                                  dimensions,
                                  layout,
                                  defaultVisualizationType,
                                  config,
                                  height,
                                  showToolbar
                              }: VisualizationProps) {
    return (
        <ErrorBoundary
            onReset={() => {
                //TODO: reset the visualization
            }}
            resetKeys={[dimensions, layout, defaultVisualizationType, config]}
            fallbackRender={(props => (<ErrorFallback height={height} {...props}/>) as any)}>
            <VisualizationProvider config={config} type={defaultVisualizationType} layout={layout}
                                   dimensions={dimensions}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        padding: 16,
                        gap: 16
                    }}>
                    {
                        showToolbar && (
                            <div style={{display: "flex", flexDirection: "row", gap: 16, justifyContent: "space-between"}}>
                                <VisualizationTypeSelector/>
                                <VisualizationDimensionSelector/>
                            </div>
                        )
                    }
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
        </ErrorBoundary>
    )
}
