import React, {createContext, useContext, useState} from "react";

export type VisualizationType = "pivot-table" | "charts" | "map";


export const VisualizationTypeContext = createContext<VisualizationType>('pivot-table')
export const VisualizationTypeSetter = createContext<React.Dispatch<React.SetStateAction<VisualizationType>> | undefined>(undefined)

export interface VisualizationTypeProviderProps {
    children: React.ReactNode;
    defaultType: VisualizationType;
}

export function useVisualizationType() {
    return [
        useContext(VisualizationTypeContext),
        useContext(VisualizationTypeSetter)
    ] as [VisualizationType, React.Dispatch<React.SetStateAction<VisualizationType>>]
}

export function VisualizationTypeProvider({children, defaultType}: VisualizationTypeProviderProps) {
    const [type, setType] = useState<VisualizationType>(defaultType);

    return (
        <VisualizationTypeContext.Provider value={type}>
            <VisualizationTypeSetter.Provider value={setType}>
                {children}
            </VisualizationTypeSetter.Provider>
        </VisualizationTypeContext.Provider>
    )
}
