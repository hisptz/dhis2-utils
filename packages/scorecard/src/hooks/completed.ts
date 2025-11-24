import { useSyncExternalStore } from "react";
import { useScorecardData } from "../components";

export function useScorecardLoadingCompleted() {
	const { data: dataEngine } = useScorecardData();
	return useSyncExternalStore(dataEngine.addOnCompleteListener, () => {
		return dataEngine.getIsCompleteSnapshot();
	});
}
