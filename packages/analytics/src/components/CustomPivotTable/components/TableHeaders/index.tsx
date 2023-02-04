import React from "react";
import {useCustomPivotTableEngine} from "../../state/engine";
import {DataTableColumnHeader, DataTableRow, TableHead} from '@dhis2/ui'
import {isEmpty, slice, times} from "lodash";
import {Header} from "../../services/engine";


function renderColumnHeaders(column: Header, index: number, {
    columns,
    rowHeaders
}: { columns: Header[], rowHeaders?: Header[] }): React.ReactNode | null {
    if (!column) {
        return null;
    }
    const colSpan = slice(columns, index + 1).reduce((acc, column) => {
        return acc * (column.items?.length ?? 1);
    }, 1);

    const hasSubColumns = !isEmpty(columns[index + 1]);
    const nextColumn = columns[index + 1];

    const multiplicationFactor = slice(columns, 0, index).reduce((acc, column) => {
        return acc * (column.items?.length ?? 1);
    }, 1);

    return (
        <>
            <DataTableRow>
                {
                    ((index === 0) && rowHeaders?.map((header) => {
                        return (
                            <DataTableColumnHeader
                                rowSpan={columns.length.toString()}
                                key={`${header.dimension}-header-column`}>
                                {header.label ?? ""}
                            </DataTableColumnHeader>
                        )
                    }))
                }
                {
                    (times(multiplicationFactor, (colNo) => {
                        return (column.items?.map((item) => (
                            <DataTableColumnHeader align="center" colSpan={colSpan.toString()}
                                                   key={`${colNo}-${item.name}-column-header`}>
                                {item.name}
                            </DataTableColumnHeader>
                        )))
                    }))
                }
            </DataTableRow>
            {
                hasSubColumns ? (renderColumnHeaders(nextColumn, index + 1, {columns, rowHeaders})) : null
            }
        </>
    )

}


export function TableHeaders() {
    const engine = useCustomPivotTableEngine();
    const columns = engine?.columnHeaders;
    const rowHeaders = engine?.rowHeaders;

    if (!columns || isEmpty(columns)) {
        return null;
    }

    return (
        <TableHead>
            {
                renderColumnHeaders(columns[0], 0, {columns, rowHeaders})
            }
        </TableHead>
    )

}
