import React from 'react';
import {PivotTableCell} from './PivotTableCell';

export interface PivotTableEmptyCellProps {
    classes?: any[] | string;
    onClick?: () => void;
    [key: string]: any
}

export const PivotTableEmptyCell = React.forwardRef(({
                                                         onClick,
                                                         classes,
                                                         ...props
                                                     }: PivotTableEmptyCellProps, ref: React.ForwardedRef<HTMLTableCellElement | null>) => {
    return (<PivotTableCell ref={ref} {...props}>
    </PivotTableCell>);
});

PivotTableEmptyCell.displayName = "PivotTableEmptyCell";

