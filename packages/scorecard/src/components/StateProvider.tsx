import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { createContext, type ReactNode, useContext, useRef } from "react";
import {
	createScorecardViewStateEngine,
	type ScorecardViewStateEngine,
} from "../utils/viewState";
import {
	createDimensionStateEngine,
	type DimensionStateEngine,
} from "../utils/dimensionState";

export interface ScorecardStateProviderProps {
	initialState?: ScorecardState;
	config: ScorecardConfig;
	children: ReactNode;
}

const ScorecardStateContext = createContext<{
	options: ScorecardViewStateEngine;
	dimension: DimensionStateEngine;
} | null>(null);

export function useScorecardViewStateEngine() {
	const context = useContext(ScorecardStateContext);
	if (!context) {
		throw Error(
			"useScorecardViewStateEngine should be used inside a Scorecard Context",
		);
	}
	return context.options;
}

export function useScorecardDimensionStateEngine() {
	const context = useContext(ScorecardStateContext);
	if (!context) {
		throw Error(
			"useScorecardDimensionStateEngine should be used inside a Scorecard Context",
		);
	}
	return context.dimension;
}

export function ScorecardStateProvider({
	children,
	initialState,
	config,
}: ScorecardStateProviderProps) {
	const viewStateEngine = useRef<ScorecardViewStateEngine>(
		createScorecardViewStateEngine(initialState?.options ?? config.options),
	);
	const dimensionStateEngine = useRef<DimensionStateEngine>(
		createDimensionStateEngine({
			orgUnitSelection:
				initialState?.orgUnitSelection ?? config.orgUnitSelection,
			periodSelection:
				initialState?.periodSelection ?? config.periodSelection,
		}),
	);

	return (
		<ScorecardStateContext.Provider
			value={{
				options: viewStateEngine.current,
				dimension: dimensionStateEngine.current,
			}}
		>
			{children}
		</ScorecardStateContext.Provider>
	);
}
