import {Analytics, LegendSet} from "@hisptz/dhis2-utils";
import {DHIS2Dimension} from "../PivotTable";
import {CustomPivotTableEngine} from "./services/engine";
import React, {useMemo} from "react";
import {CustomPivotTableEngineProvider} from "./state/engine";
import {PivotTable} from "./components/Table";
import {TableHeaders} from "./components/TableHeaders";
import {CustomPivotTableBody} from "./components/TableBody";


export interface CustomPivotTableProps {
    analytics: Analytics;
    tableProps?: {
        scrollHeight?: string;
        scrollWidth?: string;
        layout?: string;
        width?: string
    };
    config: {
        layout: {
            columns: {
                dimension: DHIS2Dimension,
                label?: string;
            }[];
            rows: {
                dimension: DHIS2Dimension,
                label?: string;
            }[];
            filter?: {
                dimension: DHIS2Dimension,
                label?: string;
            }[]
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
    const engine = useMemo(() => new CustomPivotTableEngine({analytics, config}), [analytics, config]);

    return (
        <CustomPivotTableEngineProvider engine={engine}>
            <PivotTable tableProps={tableProps}>
                <TableHeaders/>
                <CustomPivotTableBody/>
            </PivotTable>
        </CustomPivotTableEngineProvider>
    )

}
