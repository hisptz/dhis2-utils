import { createContext, type ReactNode, useContext } from "react";
import type { ScorecardAnalyticsData } from "../schemas/config";
import { useGetScorecardData } from "../hooks/data";
import {
	createScorecardDataEngine,
	type ScorecardDataEngine,
} from "../utils/dataEngine";

export interface ScorecardData {
	progress?: number;
	data: ScorecardDataEngine;
	rawData: ScorecardAnalyticsData[];
}

const ScorecardDataContext = createContext<ScorecardData>({
	data: createScorecardDataEngine(),
	rawData: [],
	progress: 0,
});

export function useScorecardData() {
	return useContext(ScorecardDataContext);
}

export function ScorecardDataProvider({ children }: { children: ReactNode }) {
	const value = useGetScorecardData();
	return (
		<ScorecardDataContext.Provider value={value}>
			{children}
		</ScorecardDataContext.Provider>
	);
}
