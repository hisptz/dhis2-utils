import { useScorecardMeta } from "../components/MetaProvider";
import { useMemo } from "react";
import { last, sortBy } from "lodash";

export function useLowestOrgUnitLevel() {
	const meta = useScorecardMeta();

	return useMemo(() => {
		const sortedOrgUnitLevels = sortBy(meta?.orgUnitLevels ?? [], "level");
		return last(sortedOrgUnitLevels);
	}, [meta?.orgUnitLevels]);
}
