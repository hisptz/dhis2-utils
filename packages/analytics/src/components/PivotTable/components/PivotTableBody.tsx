import React from 'react';
import {PivotTableClippedAxis} from './PivotTableClippedAxis.js';
import {PivotTableEmptyRow} from './PivotTableEmptyRow';
import {PivotTableRow} from './PivotTableRow.js';
import {ClippingResult, ToggleContextualMenuFunction} from "../interfaces";

export interface PivotTableBodyProps {
    clippingResult: ClippingResult;
    onToggleContextualMenu?: ToggleContextualMenuFunction
}

export const PivotTableBody = ({
                                   clippingResult,
                                   onToggleContextualMenu
                               }: PivotTableBodyProps) => (
    <tbody>
    <PivotTableClippedAxis axisClippingResult={clippingResult.rows} EmptyComponent={({size}) => (
        <PivotTableEmptyRow height={size} columns={clippingResult.columns.indices}/>)} ItemComponent={({index}) => (
        <PivotTableRow key={index} clippingResult={clippingResult} rowIndex={index}
                       onToggleContextualMenu={onToggleContextualMenu}/>)}/>
    </tbody>);

