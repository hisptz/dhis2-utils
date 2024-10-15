import type { ScorecardConfig, ScorecardState } from "../schemas/config";
import { getDataSourcesFromGroups } from "./dataSources";
import { getOrgUnitsForAnalytics } from "./orgUnits";
import type { ScorecardMeta } from "../components";

export function getDimensions({
	config,
	orgUnitSelection,
	periodSelection,
}: {
	config: ScorecardConfig;
	orgUnitSelection: ScorecardState["orgUnitSelection"];
	periodSelection: ScorecardState["periodSelection"];
}) {
	const dataItemObjects = getDataSourcesFromGroups(
		config?.dataSelection?.dataGroups ?? [],
	);

	const dataItemsIds = dataItemObjects?.map((item) => item?.id);
	const orgUnitsIds = getOrgUnitsForAnalytics(
		orgUnitSelection ?? config?.orgUnitSelection,
	);
	const periodsIds = periodSelection.periods.map((period) => period.id);

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
