import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {PivotTableCell} from './PivotTableCell';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {DataTableRow} from '@dhis2/ui'

export interface PivotTableTitleRowProps {
    containerWidth: number,
    scrollPosition: { x: number },
    title: string,
    totalWidth: number
}

export const PivotTableTitleRow = ({title, scrollPosition, containerWidth, totalWidth,}: PivotTableTitleRowProps) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }

    const columnCount = engine.width + engine.rowDepth;

    const [position, setPosition] = useState(scrollPosition.x);
    useEffect(() => {
        setPosition(Math.max(0, Math.min(scrollPosition.x, totalWidth - containerWidth)));
    }, [containerWidth, scrollPosition.x, totalWidth]);
    return (<DataTableRow>
        <PivotTableCell isHeader classes={["column-header", "title"]} colSpan={columnCount}>
            <div style={{
                marginLeft: position,
                maxWidth: containerWidth,
                textAlign: "center"
            }} data-test="visualization-title">
                {title}
            </div>
        </PivotTableCell>
    </DataTableRow>);
};

PivotTableTitleRow.propTypes = {
    containerWidth: PropTypes.number.isRequired,
    scrollPosition: PropTypes.shape({x: PropTypes.number.isRequired})
        .isRequired,
    title: PropTypes.string.isRequired,
    totalWidth: PropTypes.number.isRequired
};

