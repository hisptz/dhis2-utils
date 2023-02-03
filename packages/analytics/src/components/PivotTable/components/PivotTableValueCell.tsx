import React, {useRef} from 'react'
import {applyLegendSet} from '../utils'
import {CELL_TYPE_VALUE} from '../constants/pivotTable'
import {VALUE_TYPE_NUMBER} from '../constants/valueTypes.js'
import {PivotTableCell} from './PivotTableCell.js'
import {PivotTableEmptyCell} from './PivotTableEmptyCell'
import {usePivotTableEngine} from './PivotTableEngineContext.js'
import {ToggleContextualMenuFunction} from "../interfaces";


export interface PivotTableValueCellProps {
    row: number;
    column: number;
    onToggleContextualMenu?: ToggleContextualMenuFunction
}

export const PivotTableValueCell = ({
                                        row,
                                        column,
                                        onToggleContextualMenu,
                                    }:PivotTableValueCellProps) => {
    const engine = usePivotTableEngine()
    const cellRef = useRef<HTMLTableCellElement>(null);

    if (!engine) {
        return null;
    }

    const cellContent = engine.get({
        row,
        column,
    })

    const isClickable = !!cellContent &&
        onToggleContextualMenu &&
        cellContent.cellType === CELL_TYPE_VALUE &&
        cellContent.ouId
    const classes = !!cellContent ? [
        cellContent.cellType,
        cellContent.valueType,
        isClickable && 'clickable',
    ] : []
    const onClick = () => {
        if (onToggleContextualMenu) {
            onToggleContextualMenu(cellRef.current, {ouId: cellContent?.ouId})
        }
    }

    if (!cellContent || cellContent.empty) {
        return (
            <PivotTableEmptyCell
                onClick={isClickable ? onClick : undefined}
                ref={cellRef}
                classes={[cellContent?.cellType, isClickable && 'clickable']}
            />
        )
    }

    // TODO: Add support for 'INTEGER' type (requires server changes)
    const legendStyle =
        cellContent.cellType === CELL_TYPE_VALUE &&
        cellContent.valueType === VALUE_TYPE_NUMBER
            ? applyLegendSet(
                cellContent.rawValue,
                cellContent.dxDimension,
                engine
            )
            : undefined

    const width =
        engine.adaptiveClippingController.columns.sizes[
            engine.columnMap[column]
            ].size
    const height =
        engine.adaptiveClippingController.rows.sizes[engine.rowMap[row]].size
    const style = {
        ...legendStyle,
        width,
        height,
        whiteSpace: 'pre-line',
    }

    return (
        <PivotTableCell
            key={column}
            classes={classes}
            title={cellContent.renderedValue}
            style={style}
            onClick={isClickable ? onClick : undefined}
            ref={cellRef}
            dataTest={'visualization-value-cell'}
        >
            {cellContent.renderedValue ?? null}
        </PivotTableCell>
    )
}
