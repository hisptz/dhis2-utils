import React from 'react';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {DataTable} from '@dhis2/ui'

export interface PivotTableContainerProps {
    children: React.ReactNode,
    height: number;
    width: number;
}

export const PivotTableContainer = React.forwardRef(({
                                                         width,
                                                         height,
                                                         children
                                                     }: PivotTableContainerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }

    return (
        <div className="pivot-table-container" style={{width, height}} ref={ref} data-test="visualization-container">
            {width === 0 || height === 0 ? null : (<DataTable >
                {children}
            </DataTable>)}
        </div>);
});

PivotTableContainer.displayName = "PivotTableContainer";
