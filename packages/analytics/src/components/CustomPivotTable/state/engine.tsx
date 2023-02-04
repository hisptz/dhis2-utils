import React, {createContext, ReactNode, useContext} from "react";
import {CustomPivotTableEngine} from "../services/engine";


const CustomPivotTableEngineContext = createContext<CustomPivotTableEngine | null>(null);


export function useCustomPivotTableEngine() {
    return useContext(CustomPivotTableEngineContext)
}

export function CustomPivotTableEngineProvider({
                                                   children,
                                                   engine
                                               }: { children: ReactNode, engine: CustomPivotTableEngine }) {

    return (
        <CustomPivotTableEngineContext.Provider value={engine}>
            {children}
        </CustomPivotTableEngineContext.Provider>
    )
}
