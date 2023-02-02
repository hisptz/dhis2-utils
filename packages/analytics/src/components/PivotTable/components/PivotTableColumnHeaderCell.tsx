import React from 'react';
import {PivotTableCell} from './PivotTableCell';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {PivotTableHeaderCell} from './PivotTableHeaderCell';
import {ClippingResult} from "../interfaces";


export interface PivotTableColumnHeaderCellProps {
    clippingResult: ClippingResult,
    index: number;
    level: number;
    onSortByColumn: (column: number) => void;
    sortBy: {
        order: number;
        column: number;
    } | null
}

export const PivotTableColumnHeaderCell = ({
                                               clippingResult,
                                               index,
                                               level,
                                               onSortByColumn,
                                               sortBy,
                                           }: PivotTableColumnHeaderCellProps) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }

    const width = engine.adaptiveClippingController.columns.sizes[engine.columnMap[index]]
        ?.size;
    const height = engine.adaptiveClippingController.rows.headerSizes[level];

    return (<PivotTableHeaderCell axisClippingResult={clippingResult.columns} index={index} level={level}
                                  getHeader={(idx) => engine.getColumnHeader(idx)}
                                  showHierarchy={engine.visualization.showHierarchy} render={(header) => {
        const isSortable = level === engine.columnDepth - 1 &&
            header.span === 1 &&
            engine.isSortable(index);

        const style = {
            cursor: isSortable ? "pointer" : "default",
            width,
            height,
            whiteSpace: level === engine.columnDepth - 1
                ? "pre-line"
                : "nowrap"
        };

        if (engine.options.fixColumnHeaders) {
            style.top =
                level * (engine.fontSize + engine.cellPadding * 2 + 2);
            // left value for the column header cells should be sum of row headers' width when engine.options.fixRowHeaders is true
            style.left = engine.options.fixRowHeaders
                ? engine.rowHeaderPixelWidth
                : 0;
        }

        return (<PivotTableCell
            index={index}
            isSortable={isSortable}
            sortOrder={sortBy}
            onSortClick={isSortable ? () => onSortByColumn(index) : undefined}
            isHeader
            classes={[
                header.label &&
                header.label !== "Total" &&
                header.label !== "Subtotal" // TODO: Actually look up the column type!
                    ? "column-header"
                    : "empty-header",
                {
                    "fixed-header": engine.options.fixColumnHeaders
                },
            ]} colSpan={header.span} title={header.label} style={style}

            onClick={isSortable ? () => onSortByColumn(index) : undefined}>
            <div className="column-header-inner">
                            <span className="column-header-label" data-test="visualization-column-header">
                                {header.label}
                            </span>
            </div>
        </PivotTableCell>);
    }}/>);
};

