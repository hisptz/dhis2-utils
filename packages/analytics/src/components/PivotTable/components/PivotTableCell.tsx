import React from 'react';
import {usePivotTableEngine} from './PivotTableEngineContext.js';
import {DataTableCell, DataTableColumnHeader} from '@dhis2/ui'
import {SORT_ORDER_ASCENDING, SORT_ORDER_DESCENDING} from "../constants/pivotTable";

export interface PivotTableCellProps {
    children: React.ReactNode,
    classes: Array<string> | Record<string, any> | string,
    dataTest: string,
    isHeader: boolean,
    style: Record<string, any>;
    isSortable?: boolean;
    index: number;
    sortBy: {
        order: number;
        column: number;
    }

    onSortClick?: () => void;

    [key: string]: any
}

export const PivotTableCell = React.forwardRef(({
                                                    classes,
                                                    isHeader = false,
                                                    index,
                                                    isSortable,
                                                    sortBy,
                                                    children,
                                                    dataTest,
                                                    onSortClick,
                                                    style = {},
                                                    ...props
                                                }: PivotTableCellProps, ref: React.ForwardedRef<HTMLTableCellElement>) => {
    const engine = usePivotTableEngine();


    if (!engine) {
        return null;
    }

    style.width = style.minWidth = style.maxWidth = style.width;

    style.height =
        style.minHeight =
            style.maxHeight =
                style.height || (engine.fontSize) + engine.cellPadding * 2 + 2;


    return isHeader ? (<DataTableColumnHeader bordered
        onSortIconClick={isSortable ? onSortClick : undefined}
        sortDirection={isSortable ? sortBy?.column === index ? (sortBy?.order === SORT_ORDER_DESCENDING ? "desc" : sortBy.order === SORT_ORDER_ASCENDING ? "asc" : "default") : undefined : undefined}
        {...props}>
        {children}
    </DataTableColumnHeader>) : (<DataTableCell bordered ref={ref}>
        {children}
    </DataTableCell>);
});

PivotTableCell.displayName = "PivotTableCell";


