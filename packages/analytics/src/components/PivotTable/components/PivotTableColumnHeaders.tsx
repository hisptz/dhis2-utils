import times from 'lodash/times';
import React from 'react';
import {PivotTableClippedAxis} from './PivotTableClippedAxis';
import {PivotTableColumnHeaderCell} from './PivotTableColumnHeaderCell';
import {PivotTableDimensionLabelCell} from './PivotTableDimensionLabelCell';
import {PivotTableEmptyCell} from './PivotTableEmptyCell';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {ClippingResult} from "../interfaces";

export interface PivotTableColumnHeadersProps {
    clippingResult: ClippingResult;
    onSortByColumn: (column: number) => void;
    sortBy: {
        order: number;
        column: number
    } | null
}

export const PivotTableColumnHeaders = ({clippingResult, onSortByColumn, sortBy,}: PivotTableColumnHeadersProps) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }

    const columns = times(engine.columnDepth, (x) => x);
    const rows = times(engine.rowDepth, (x) => x);

    return (
        <>
            {
                columns.map((columnLevel) => (<tr key={columnLevel}>
                    {rows.map((rowLevel) => (
                        <PivotTableDimensionLabelCell key={rowLevel} rowLevel={rowLevel} columnLevel={columnLevel}/>))}
                    <PivotTableClippedAxis axisClippingResult={clippingResult.columns}
                                           EmptyComponent={({size}: { size: number }) => (
                                               <PivotTableEmptyCell classes="column-header" style={{minWidth: size}}/>)}
                                           ItemComponent={({index}: { index: number }) => (
                                               <PivotTableColumnHeaderCell clippingResult={clippingResult} index={index}
                                                                           level={columnLevel}
                                                                           onSortByColumn={onSortByColumn}
                                                                           sortBy={sortBy}/>)}/>
                </tr>))
            }
        </>
    );
};

