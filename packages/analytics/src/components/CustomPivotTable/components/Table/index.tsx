import React from "react";
import {DataTable} from '@dhis2/ui'

export interface PivotTableProps {
    children: React.ReactNode;
    tableProps?: {
        scrollHeight?: string;
        scrollWidth?: string;
        layout?: string;
        width?: string
    };
}

export function PivotTable({tableProps, children}: PivotTableProps) {
    return (
        <DataTable {...(tableProps ?? {})} >
            {children}
        </DataTable>
    )
}
