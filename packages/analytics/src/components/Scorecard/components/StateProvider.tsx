import React, {
	createContext,
	type Dispatch,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import i18n from "@dhis2/d2-i18n";
import { PeriodUtility } from "@hisptz/dhis2-utils";

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
	config: ScorecardConfig;
	children: React.ReactNode;
}> = ({ config, children }) => {
	const [state, setState] = useState<ScorecardState>({
		...config,
	});

	const relativePeriod = PeriodUtility.getPeriodById("LAST_MONTH");

	return (
		<ScorecardStateContext.Provider
			value={{
				...state,
				hasOnePeriod: state.periodSelection.periods.length === 1,
			}}
		>
			<ScorecardSetStateContext.Provider value={setState}>
				{children}
			</ScorecardSetStateContext.Provider>
		</ScorecardStateContext.Provider>
	);
};
