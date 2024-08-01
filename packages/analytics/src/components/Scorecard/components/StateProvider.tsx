import React, { createContext, useContext } from "react";
import type { ScorecardState } from "../schemas/config";

const ScorecardStateContext = createContext<ScorecardState | null>(null);

export function useScorecardState() {
	return useContext(ScorecardStateContext);
}

export const ScorecardStateProvider: React.FC<{
	config: ScorecardState;
	children: React.ReactNode;
}> = ({ config, children }) => {
	return (
		<ScorecardStateContext.Provider
			value={{
				...config,
				hasOnePeriod: config.periodSelection.periods.length === 1,
			}}
		>
			{children}
		</ScorecardStateContext.Provider>
	);
};
