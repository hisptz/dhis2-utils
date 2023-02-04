import {Analytics, LegendSet} from "@hisptz/dhis2-utils";
import React from "react";
import {PivotTable} from "./components/PivotTable";
import {DHIS2Dimension} from "./interfaces";

export * from "./interfaces"

export interface CustomPivotTableProps {
    analytics: Analytics;
    tableProps?: Record<string, any>;
    renderCounter?: number;
    config: {
        layout: {
            columns: Array<DHIS2Dimension>;
            rows: Array<DHIS2Dimension>;
            filter?: Array<DHIS2Dimension>;
        },
        options?: {
            legendSets?: LegendSet[],
            hideEmptyColumns?: boolean,
            hideEmptyRows?: boolean,
            showRowTotals?: boolean,
            showColumnTotals?: boolean,
            showRowSubtotals?: boolean,
            showColumnSubtotals?: boolean,
            fixColumnHeaders?: boolean,
            fixRowHeaders?: boolean,
        }
    }
}

export function CustomPivotTable({analytics, config, tableProps}: CustomPivotTableProps) {
    return (
        <PivotTable
            tableProps={tableProps}
            data={analytics}
            legendSets={config.options?.legendSets}
            visualization={{
                columns: config.layout.columns.map((column: DHIS2Dimension) => ({dimension: column})) ?? [],
                rows: config.layout.rows.map((column: DHIS2Dimension) => ({dimension: column})) ?? [],
                filter: config.layout.filter?.map((column: DHIS2Dimension) => ({dimension: column})) ?? [],
                ...(config.options ?? {})
            }}
        />
    )
}


