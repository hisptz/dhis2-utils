import React, {createContext, useCallback, useContext, useReducer} from "react";
import {AnalyticsDimension} from "@hisptz/dhis2-utils";
import {cloneDeep, set} from "lodash";

export type Dimension = "ou" | "pe" | "dx" | "co";

export type DimensionUpdater = (data: { dimension: Dimension; value: string[] }) => void
export const DimensionState = createContext<AnalyticsDimension>({
    dx: [],
    pe: [],
    ou: []
})
export const DimensionUpdateState = createContext<DimensionUpdater | undefined>(undefined);


function reducer(state: AnalyticsDimension, {dimension, value}: { dimension: Dimension, value: string[] }) {
    const updatedState = cloneDeep({...(state ?? {})});
    set(state, [dimension], value);
    return updatedState
}

export interface DimensionProviderProps {
    children: React.ReactNode,
    dimensions: AnalyticsDimension
}

export function useDimensions() {
    return [
        useContext(DimensionState),
        useContext(DimensionUpdateState)
    ]
}

export function DimensionsProvider({children, dimensions}: DimensionProviderProps) {
    const [state, dispatch] = useReducer(reducer, dimensions);
    const updateDimension = useCallback((updatedDimension: { dimension: Dimension; value: string[] }) => {
        dispatch(updatedDimension);
    }, [dispatch])

    return <DimensionState.Provider value={state}>
        <DimensionUpdateState.Provider value={updateDimension}>
            {children}
        </DimensionUpdateState.Provider>
    </DimensionState.Provider>
}
