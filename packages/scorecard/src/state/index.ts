import { atom, useRecoilValue } from "recoil";
import type { ScorecardState } from "../schemas/config";

export const scorecardStateAtom = atom<ScorecardState | null>({
	key: "scorecardState",
	default: null,
	dangerouslyAllowMutability: true,
});

export function useScorecardStateValue() {
	return useRecoilValue(scorecardStateAtom);
}
