import React, { createContext, useContext } from "react";
import type { ScorecardState } from "../schemas/config";

export type ScorecardSetState = (
	state: ScorecardState | ((prevState: ScorecardState) => ScorecardState),
) => void;

const ScorecardSetStateContext = createContext<ScorecardSetState | null>(null);

export function useScorecardSetState() {
	return useContext(ScorecardSetStateContext);
}

export const ScorecardSetStateProvider: React.FC<{
	setState: ScorecardSetState;
	children: React.ReactNode;
}> = ({ setState, children }) => {
	return (
		<ScorecardSetStateContext.Provider value={setState}>
			{children}
		</ScorecardSetStateContext.Provider>
	);
};
