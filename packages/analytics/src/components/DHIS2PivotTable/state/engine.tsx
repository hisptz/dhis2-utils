import React, { createContext, ReactNode, useContext } from "react";
import { DHIS2PivotTableEngine } from "../services/engine";

const DHIS2PivotTableEngineContext =
	createContext<DHIS2PivotTableEngine | null>(null);

export function useCustomPivotTableEngine() {
	return useContext(DHIS2PivotTableEngineContext);
}

export function DHIS2PivotTableEngineProvider({
	children,
	engine,
}: {
	children: ReactNode;
	engine: DHIS2PivotTableEngine;
}) {
	return (
		<DHIS2PivotTableEngineContext.Provider value={engine}>
			{children}
		</DHIS2PivotTableEngineContext.Provider>
	);
}
