import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { getDataSourcesFromGroups } from "./dataSources";
import { getOrgUnitsForAnalytics } from "./orgUnits";
import type { ScorecardMeta } from "../components";

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
	const periodsIds = state.periodSelection.periods.map((period) => period.id);

	return {
		dataItemsIds,
		orgUnitsIds,
		periodsIds,
	};
}

export function getDimensionsFromMeta({ meta }: { meta: ScorecardMeta }) {
	const dataItemsIds = meta.dataItems.map((item) => item.uid);
	const orgUnitsIds = meta.orgUnits.map((orgUnit) => orgUnit.uid);
	const periodsIds = meta.periods.map((period) => period.uid);

	return {
		dataItemsIds,
		orgUnitsIds,
		periodsIds,
	};
}
