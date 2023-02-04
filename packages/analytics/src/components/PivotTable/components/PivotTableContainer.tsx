import React from 'react';
import {usePivotTableEngine} from './PivotTableEngineContext';
import {DataTable} from '@dhis2/ui'

export interface PivotTableContainerProps {
    children: React.ReactNode,
    height: number;
    width: number;
    tableProps?: Record<string, any>;
}

export const PivotTableContainer = React.forwardRef(({
                                                         width,
                                                         height,
                                                         children,
                                                         tableProps,
                                                     }: PivotTableContainerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const engine = usePivotTableEngine();

    if (!engine) {
        return null;
    }

    return (
        <div style={{width: "100%", height: "100%"}} className="pivot-table-container" ref={ref} data-test="visualization-container">
            {width === 0 || height === 0 ? null : (<DataTable height={height} {...(tableProps ?? {})}>
                {children}
            </DataTable>)}
        </div>);
});

PivotTableContainer.displayName = "PivotTableContainer";
