import React, { createContext, useContext } from "react";
import type { ScorecardConfig } from "../schemas/config";

const ScorecardConfigContext = createContext<ScorecardConfig | null>(null);

export function useScorecardConfig() {
	return useContext(ScorecardConfigContext);
}

export const ScorecardConfigProvider: React.FC<{
	config: ScorecardConfig;
	children: React.ReactNode;
}> = ({ config, children }) => {
	return (
		<ScorecardConfigContext.Provider value={config}>
			{children}
		</ScorecardConfigContext.Provider>
	);
};
