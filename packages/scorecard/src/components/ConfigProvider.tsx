import {
	createContext,
	type FC,
	memo,
	type ReactNode,
	useContext,
} from "react";
import type { ScorecardConfig } from "../schemas/config";
import i18n from "@dhis2/d2-i18n";

const ScorecardConfigContext = createContext<ScorecardConfig | null>(null);

export function useScorecardConfig() {
	const config = useContext(ScorecardConfigContext);
	if (!config) {
		throw Error(
			i18n.t(
				"useScorecardConfig should be used inside a Scorecard Context",
			),
		);
	}
	return config;
}

export const ScorecardConfigProvider: FC<{
	config: ScorecardConfig;
	children: ReactNode;
}> = memo(({ config, children }) => {
	return (
		<ScorecardConfigContext.Provider value={config}>
			{children}
		</ScorecardConfigContext.Provider>
	);
});
