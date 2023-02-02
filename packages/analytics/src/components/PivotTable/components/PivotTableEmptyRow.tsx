import React from 'react';
import {PivotTableCell} from './PivotTableCell';
import {usePivotTableEngine} from './PivotTableEngineContext';


export const PivotTableEmptyRow = ({height, columns}: { height: number; columns: any[] }) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }
    return (<tr>
        <PivotTableCell isHeader={true} colSpan={engine.rowDepth} style={{height}} classes={[
            "row-header",
            {
                "fixed-header": engine.options.fixRowHeaders
            },
        ]}/>
        {columns.map((i) => (<PivotTableCell key={i}/>))}
    </tr>);
};


