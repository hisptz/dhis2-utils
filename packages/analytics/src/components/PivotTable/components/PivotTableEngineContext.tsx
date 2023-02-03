import React, {createContext, useContext} from 'react';
import {PivotTableEngine} from "../services/engine";

export const PivotTableEngineContext = createContext<PivotTableEngine | null>(null);

export const Provider = ({engine, children}: { engine: PivotTableEngine; children: React.ReactNode }) => {
    return (<PivotTableEngineContext.Provider value={engine}>
        {children}
    </PivotTableEngineContext.Provider>);
};
export const usePivotTableEngine = () => {
    return useContext<PivotTableEngine | null>(PivotTableEngineContext);
};

