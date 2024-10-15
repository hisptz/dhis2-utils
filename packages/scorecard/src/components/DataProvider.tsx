import { createContext, memo, type ReactNode, useContext, useRef } from "react";
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

export function useScorecardData() {
	return useContext(ScorecardDataContext);
}

export const ScorecardDataProvider = memo(function ScorecardDataProvider({
	children,
}: {
	children: ReactNode;
}) {
	const dataEngine = useRef<ScorecardDataEngine>(createScorecardDataEngine());
	useGetScorecardData(dataEngine.current);

	return (
		<ScorecardDataContext.Provider
			value={{
				data: dataEngine.current,
			}}
		>
			{children}
		</ScorecardDataContext.Provider>
	);
});
