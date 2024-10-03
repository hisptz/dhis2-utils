import type { ScorecardDataQueryResponse } from "../hooks/data";
import type { ScorecardMeta } from "../components";
import type {
	ScorecardConfig,
	ScorecardDataGroup,
	ScorecardTableData,
} from "../schemas/config";
import { fromPairs, head } from "lodash";

export interface AnalyticsData {
	dx?: string;
	pe?: string;
	ou?: string;
	value?: string;

	[key: string]: string | undefined;
}

export function sanitizeAnalyticsData(data: ScorecardDataQueryResponse) {
	const { headers, rows } = data.data;
	return rows.map((row) => {
		return fromPairs(
			row.map((value, index) => {
				const key = headers[index].name as "dx" | "ou" | "pe";
				return [key, value];
			}),
		) as AnalyticsData;
	});
}

export function getRowsFromMeta({
	meta,
	config,
	showHierarchy,
	showDataInRows,
}: {
	meta: ScorecardMeta;
	showDataInRows: boolean;
	showHierarchy: boolean;
	config: ScorecardConfig;
}): ScorecardTableData[] {
	function getOrgUnitData() {
		return meta.orgUnits
			.map((orgUnit) => {
				const label = showHierarchy
					? orgUnit.hierarchy.replace("/", "") ?? ""
					: orgUnit.name ?? "";

				return {
					label,
					orgUnit,
				};
			})
			.flat();
	}

	function getDataGroupsData(dataGroups: ScorecardDataGroup[]) {
		return dataGroups
			.map(({ dataHolders }) => {
				return dataHolders.map((dataHolder) => {
					const { dataSources, id } = dataHolder;
					const label =
						(dataSources.length === 1
							? head(dataSources)?.label
							: dataSources.reduce(
									(acc, { label }) => `${acc} / ${label}`,
									"",
								)) ?? "";

					return {
						id,
						label,
						dataHolder,
					};
				});
			})
			.flat();
	}

	//No need of computing the average of each row
	if (showDataInRows) {
		//Rows are derived from groups
		const dataGroups = config.dataSelection.dataGroups;
		return getDataGroupsData(dataGroups);
	}
	return getOrgUnitData();
}
