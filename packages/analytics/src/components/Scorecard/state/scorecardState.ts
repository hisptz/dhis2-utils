import {
	atom,
	selectorFamily,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";
import type { ScorecardState } from "../schemas/config";
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

export function useScorecardStateSelector<ConfigType>(path: string | string[]) {
	return useRecoilState(scorecardStateSelector(path));
}
