import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { ScorecardDataSource } from "../../../../schemas/config";

export interface DictionaryConfig {
	selectedDataSource?: ScorecardDataSource;
	dataSources: ScorecardDataSource[];
}

const DictionaryConfigContext = createContext<
	[DictionaryConfig, Dispatch<SetStateAction<DictionaryConfig>>] | null
>(null);

export function useDictionaryConfigState() {
	const context = useContext(DictionaryConfigContext);
	if (!context) {
		throw Error(
			"The useDictionaryConfigState must be used within the DictionaryConfigContext",
		);
	}
	return useContext(DictionaryConfigContext)!;
}

export function DictionaryConfigProvider({
	initialConfig,
	children,
}: {
	initialConfig: DictionaryConfig;
	children: ReactNode;
}) {
	const value = useState<DictionaryConfig>(initialConfig);

	if (value == null) {
		return null;
	}

	return (
		<DictionaryConfigContext.Provider value={value}>
			{children}
		</DictionaryConfigContext.Provider>
	);
}
