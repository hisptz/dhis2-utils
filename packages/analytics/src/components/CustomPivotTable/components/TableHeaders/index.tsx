import React from "react";
import {useCustomPivotTableEngine} from "../../state/engine";
import {DataTableColumnHeader, DataTableRow, TableHead} from '@dhis2/ui'
import {isEmpty, slice, times} from "lodash";
import {Header} from "../../services/engine";
import classes from "./TableHeaders.module.css"
import {useElementSize} from "usehooks-ts";

function renderColumnHeaders(column: Header, index: number, {
    columns,
    rowHeaders,
    prevHeight = 0
}: { columns: Header[], rowHeaders?: Header[], prevHeight?: number }): React.ReactNode | null {
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

    const [columnHeaderRef, {height}] = useElementSize();

    return (
        <>
            <DataTableRow>
                {
                    ((index === 0) && rowHeaders?.map((header) => {
                        return (
                            <DataTableColumnHeader
                                fixed
                                top={"0"}
                                className={classes['table-header']}
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
                            <DataTableColumnHeader
                                fixed
                                top={`${prevHeight.toString()}px`}
                                ref={index === 0 ? columnHeaderRef : undefined}
                                className={classes['table-header']} align="center"
                                colSpan={colSpan.toString()}
                                key={`${colNo}-${item.name}-column-header`}>
                                {item.name}
                            </DataTableColumnHeader>
                        )))
                    }))
                }
            </DataTableRow>
            {
                hasSubColumns ? (renderColumnHeaders(nextColumn, index + 1, {
                    columns,
                    rowHeaders,
                    prevHeight: height
                })) : null
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
