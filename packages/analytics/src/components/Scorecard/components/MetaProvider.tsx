import { createContext, type ReactNode, useContext } from "react";

export interface ScorecardMeta {}

const ScorecardMetaContext = createContext<ScorecardMeta | null>(null);

export function useScorecardMeta() {
	return useContext(ScorecardMetaContext);
}

export const ScorecardMetaProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<ScorecardMetaContext.Provider value={{}}>
			{children}
		</ScorecardMetaContext.Provider>
	);
};
