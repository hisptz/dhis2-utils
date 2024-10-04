import { createContext, type ReactNode, useContext, useRef } from "react";
import { useGetScorecardData } from "../hooks/data";
import {
	createScorecardDataEngine,
	type ScorecardDataEngine,
} from "../utils/dataEngine";

export interface ScorecardData {
	data: ScorecardDataEngine;
}

const ScorecardDataContext = createContext<ScorecardData>({
	data: createScorecardDataEngine(),
});

const ScorecardDataFetchProgress = createContext<{ progress: number }>({
	progress: 0,
});

export function useScorecardData() {
	return useContext(ScorecardDataContext);
}

export function useScorecardDataFetchProgress() {
	return useContext(ScorecardDataFetchProgress);
}

export function ScorecardDataFetchProgressProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { data: dataEngine } = useScorecardData();
	const value = useGetScorecardData(dataEngine);

	return (
		<ScorecardDataFetchProgress.Provider value={value}>
			{children}
		</ScorecardDataFetchProgress.Provider>
	);
}

export function ScorecardDataProvider({ children }: { children: ReactNode }) {
	const dataEngine = useRef<ScorecardDataEngine>(createScorecardDataEngine());
	return (
		<ScorecardDataContext.Provider
			value={{
				data: dataEngine.current,
			}}
		>
			{children}
		</ScorecardDataContext.Provider>
	);
}
