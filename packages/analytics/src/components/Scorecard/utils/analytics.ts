import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { getDataSourcesFromGroups } from "./dataSources";
import { getOrgUnitsForAnalytics } from "./orgUnits";

export function getDimensions({
	config,
	state,
}: {
	config: ScorecardConfig;
	state: ScorecardState;
}) {
	const dataItemObjects = getDataSourcesFromGroups(
		config?.dataSelection?.dataGroups ?? [],
	);

	const dataItemsIds = dataItemObjects?.map((item) => item?.id);
	const orgUnitsIds = getOrgUnitsForAnalytics(
		state?.orgUnitSelection ?? config?.orgUnitSelection,
	);
	const periodsIds = state.periodSelection.periods.map(({ id }) => id);

	return {
		dataItemsIds,
		orgUnitsIds,
		periodsIds,
	};
}
