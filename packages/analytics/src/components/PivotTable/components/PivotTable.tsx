import PropTypes from 'prop-types';
import React, {useMemo, useRef} from 'react';
import {PivotTableEngine} from '../services/engine';
import {PivotTableBody} from './PivotTableBody';
import {PivotTableContainer} from './PivotTableContainer';
import {Provider} from './PivotTableEngineContext';
import {PivotTableHead} from './PivotTableHead';
import {useTableClipping} from "../hooks/useTableClipping";
import {useSortableColumns} from "../hooks/useSortableColumns";
import {useParentSize} from "../hooks/useParentSize";
import {LegendSet} from "@hisptz/dhis2-utils";
import {PivotTableVisualization, ToggleContextualMenuFunction} from "../interfaces";


export interface PivotTableProps {
    data: Record<string, any>;
    visualization: PivotTableVisualization,
    legendSets: Array<LegendSet>;
    renderCounter: number;
    onToggleContextualMenu: ToggleContextualMenuFunction
}

const PivotTable = ({visualization, data, legendSets, renderCounter, onToggleContextualMenu,}: PivotTableProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {width, height} = useParentSize(containerRef, renderCounter);

    const engine = useMemo(() => new PivotTableEngine(visualization, data, legendSets), [visualization, data, legendSets]);

    const {sortBy, onSortByColumn} = useSortableColumns(engine);

    const clippingResult = useTableClipping({
        containerRef,
        width,
        height,
        engine
    });

    return (<Provider engine={engine}>
        <PivotTableContainer ref={containerRef} width={width} height={height}>
            <PivotTableHead
                clippingResult={clippingResult}
                width={width}
                sortBy={sortBy}
                onSortByColumn={onSortByColumn}
            />
            <PivotTableBody clippingResult={clippingResult} onToggleContextualMenu={onToggleContextualMenu}/>
        </PivotTableContainer>
    </Provider>);
};

PivotTable.propTypes = {
    data: PropTypes.object.isRequired,
    visualization: PropTypes.object.isRequired,
    legendSets: PropTypes.arrayOf(PropTypes.object),
    renderCounter: PropTypes.number,
    onToggleContextualMenu: PropTypes.func
};

export default PivotTable;

