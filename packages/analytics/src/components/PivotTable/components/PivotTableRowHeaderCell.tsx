import React from 'react';
import {PivotTableCell} from './PivotTableCell';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {PivotTableHeaderCell} from './PivotTableHeaderCell.js';
import {ClippingResult} from "../interfaces";


export interface PivotTableRowHeaderCellProps {
    clippingResult: ClippingResult,
    rowIndex: number;
    rowLevel: number;
}

export const PivotTableRowHeaderCell = ({clippingResult, rowIndex, rowLevel,}: PivotTableRowHeaderCellProps) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }

    const width = engine.adaptiveClippingController.columns.headerSizes[rowLevel];
    const height = engine.adaptiveClippingController.rows.sizes[engine.rowMap[rowIndex]]
        ?.size;

    return (<PivotTableHeaderCell
        axisClippingResult={clippingResult.rows}
        index={rowIndex} level={rowLevel}
        getHeader={(idx) => engine.getRowHeader(idx)}
        showHierarchy={engine.visualization.showHierarchy}
        render={(header) => (<PivotTableCell isHeader classes={[
            header.label &&
            header.label !== "Total" &&
            header.label !== "Subtotal"
                ? "row-header"
                : "empty-header",
            header.includesHierarchy && "row-header-hierarchy",
            {
                "fixed-header": engine.options.fixRowHeaders
            },
        ]} rowSpan={header.span} title={header.label} style={{
            width,
            height,
            left: rowLevel > 0
                ? // calculate the width of all row header cells on the left of current cell
                engine.adaptiveClippingController.columns.headerSizes
                    .slice(0, rowLevel)
                    .reduce((width: number, acc: number) => (acc += width), 0)
                : 0
        }} dataTest="visualization-row-header">
            {header.label}
        </PivotTableCell>)}/>);
};

