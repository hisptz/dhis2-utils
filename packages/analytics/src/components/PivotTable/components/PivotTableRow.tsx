import times from 'lodash/times';
import PropTypes from 'prop-types';
import React from 'react';
import {PivotTableClippedAxis} from './PivotTableClippedAxis.js';
import {PivotTableEmptyCell} from './PivotTableEmptyCell';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {PivotTableRowHeaderCell} from './PivotTableRowHeaderCell.js';
import {PivotTableValueCell} from './PivotTableValueCell';
import {ClippingResult, ToggleContextualMenuFunction} from "../interfaces";
import {DataTableRow} from '@dhis2/ui'

export interface PivotTableRowProps {
    clippingResult: ClippingResult,
    rowIndex: number,
    onToggleContextualMenu: ToggleContextualMenuFunction
}

export const PivotTableRow = ({clippingResult, rowIndex, onToggleContextualMenu,}: PivotTableRowProps) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }


    return (<DataTableRow>
        {times(engine.rowDepth, (x) => x).map((rowLevel) => (
            <PivotTableRowHeaderCell key={rowLevel} clippingResult={clippingResult} rowIndex={rowIndex}
                                     rowLevel={rowLevel}/>))}
        <PivotTableClippedAxis
            axisClippingResult={clippingResult.columns}
            EmptyComponent={({size}) => (
                <PivotTableEmptyCell classes="value" style={{width: size}}/>)}
            ItemComponent={({index: columnIndex}) => (
                <PivotTableValueCell row={rowIndex} column={columnIndex}
                                     onToggleContextualMenu={onToggleContextualMenu}/>)}
        />
    </DataTableRow>);
};

PivotTableRow.propTypes = {
    clippingResult: PropTypes.shape({
        columns: PropTypes.object.isRequired,
        rows: PropTypes.object.isRequired
    }).isRequired,
    rowIndex: PropTypes.number.isRequired,
    onToggleContextualMenu: PropTypes.func
};

