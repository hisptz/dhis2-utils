import React, {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";
import type { ScorecardState } from "../schemas/config";
import i18n from "@dhis2/d2-i18n";
import { useScorecardConfig } from "./ConfigProvider";
import { getInitialStateFromConfig } from "../utils/state";
import { get } from "lodash";

export type ScorecardSetState = Dispatch<SetStateAction<ScorecardState>>;
const ScorecardStateContext = createContext<ScorecardState | null>(null);
const ScorecardSetStateContext = createContext<ScorecardSetState | null>(null);

export function useScorecardState() {
	const state = useContext(ScorecardStateContext);
	if (!state) {
		throw Error(
			i18n.t(
				"useScorecardState should be used inside a Scorecard Context",
			),
		);
	}
	return state;
}

export function useScorecardStateSelector<Value>(path: string | string[]) {
	const state = useScorecardState();
	return useMemo(() => {
		return get(state, path) as Value;
	}, [get(state, path)]);
}

export function useScorecardSetState() {
	const setState = useContext(ScorecardSetStateContext);
	if (!setState) {
		throw Error(
			i18n.t(
				"useScorecardSetState should be used inside a Scorecard Context",
			),
		);
	}
	return setState;
}

export const ScorecardStateProvider: React.FC<{
	children: React.ReactNode;
	initialState?: ScorecardState;
}> = ({ children, initialState }) => {
	const config = useScorecardConfig();
	const [state, setState] = useState<ScorecardState>(
		initialState ?? getInitialStateFromConfig(config),
	);

	return (
		<ScorecardStateContext.Provider
			value={{
				...state,
				hasOnePeriod: state.periodSelection.periods?.length === 1,
			}}
		>
			<ScorecardSetStateContext.Provider value={setState}>
				{children}
			</ScorecardSetStateContext.Provider>
		</ScorecardStateContext.Provider>
	);
};
