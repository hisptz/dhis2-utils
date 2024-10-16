import {
	atom,
	selectorFamily,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import type {
	OrgUnitSelection,
	PeriodSelection,
	ScorecardState,
	ScorecardViewOptions,
} from "../schemas/config";
import { get as _get, set as _set } from "lodash";

export const scorecardStateAtom = atom<ScorecardState | null>({
	key: "scorecardState",
	default: null,
	dangerouslyAllowMutability: true,
});

export const scorecardStateSelector = selectorFamily({
	key: "scorecardStateSelector",
	get:
		(path: string | string[]) =>
		({ get }) => {
			return _get(get(scorecardStateAtom), path);
		},
	set:
		(path: string | string[]) =>
		({ set }, newValue) => {
			set(scorecardStateAtom, (prevValue) => {
				const updateState = { ...prevValue };
				_set(updateState, path, newValue);
				return updateState as ScorecardState;
			});
		},
});

export function useScorecardStateValue() {
	return useRecoilValue(scorecardStateAtom);
}

export function useScorecardOrgUnitSelectionState() {
	return useRecoilState<OrgUnitSelection>(
		scorecardStateSelector("orgUnitSelection"),
	);
}

export function useScorecardPeriodState() {
	return useRecoilState<PeriodSelection>(
		scorecardStateSelector("periodSelection"),
	);
}

export function useSetScorecardStateSelector<ConfigType>(
	path: string | string[],
) {
	return useSetRecoilState<ConfigType>(scorecardStateSelector(path));
}

export function useScorecardStateSelectorValue<ConfigType>(
	path: string | string[],
) {
	return useRecoilValue<ConfigType>(scorecardStateSelector(path));
}

export function useScorecardViewOptionValue(key: keyof ScorecardViewOptions) {
	return useScorecardStateSelectorValue([
		"options",
		key,
	]) as ScorecardViewOptions[typeof key];
}

export function useScorecardStateSelector<ConfigType>(path: string | string[]) {
	return useRecoilState(scorecardStateSelector(path));
}
