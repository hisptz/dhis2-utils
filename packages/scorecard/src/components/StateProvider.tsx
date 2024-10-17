import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { type ReactNode, useCallback } from "react";
import { MutableSnapshot, RecoilRoot, useRecoilCallback } from "recoil";
import { scorecardStateAtom } from "../state";
import { getInitialStateFromConfig } from "../utils";

export interface ScorecardStateProviderProps {
	initialState?: ScorecardState;
	config: ScorecardConfig;
	children: ReactNode;
	withRecoilRoot?: boolean;
}

export function ScorecardStateProvider({
	children,
	initialState,
	config,
	withRecoilRoot,
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
	const initializeStateWithoutRecoil = useRecoilCallback(
		({ set, snapshot }) =>
			(initialState: ScorecardState) => {
				if (
					snapshot.getLoadable(scorecardStateAtom).contents === null
				) {
					set(scorecardStateAtom, initialState);
				}
			},
	);

	if (!withRecoilRoot) {
		initializeStateWithoutRecoil(
			initialState ?? getInitialStateFromConfig(config),
		);
	}

	if (withRecoilRoot) {
		return <RecoilRoot initializeState={initState}>{children}</RecoilRoot>;
	}

	return children;
}
