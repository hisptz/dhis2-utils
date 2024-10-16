import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { type ReactNode, useCallback } from "react";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { scorecardStateAtom } from "../state/scorecardState";
import { getInitialStateFromConfig } from "../utils";

export interface ScorecardStateProviderProps {
	initialState?: ScorecardState;
	config: ScorecardConfig;
	children: ReactNode;
}

export function ScorecardStateProvider({
	children,
	initialState,
	config,
}: ScorecardStateProviderProps) {
	const initState = useCallback(
		({ set }: MutableSnapshot) => {
			set(
				scorecardStateAtom,
				initialState ?? getInitialStateFromConfig(config),
			);
		},
		[initialState, config],
	);

	return <RecoilRoot initializeState={initState}>{children}</RecoilRoot>;
}
