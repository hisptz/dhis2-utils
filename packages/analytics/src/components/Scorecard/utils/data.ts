import type { ScorecardDataQueryResponse } from "../hooks/data";
import type { ScorecardMeta } from "../components/MetaProvider";
import type {
	ScorecardConfig,
	ScorecardState,
	ScorecardTableData,
} from "../schemas/config";
import { compact, fromPairs, head } from "lodash";
import { getAverageValue } from "./columns";

export interface AnalyticsData {
	dx?: string;
	pe?: string;
	ou?: string;

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

export function getTableDataFromAnalytics(
	data: ScorecardDataQueryResponse,
	{
		meta,
		state,
		config,
	}: { meta: ScorecardMeta; state: ScorecardState; config: ScorecardConfig },
): ScorecardTableData[] {
	const dataInRows = state.options.showDataInRows;
	const showHierarchy = state.options.showHierarchy;
	const sanitizedAnalyticsData = sanitizeAnalyticsData(data);

	const averageFilter = state.options.averageDisplayType;
	if (
		averageFilter !== "ABOVE_AVERAGE" &&
		averageFilter !== "BELOW_AVERAGE"
	) {
		//No need of computing the average of each row
		if (dataInRows) {
			//Rows are derived from groups
			const dataGroups = config.dataSelection.dataGroups;
			return dataGroups
				.map(({ dataHolders }) => {
					return dataHolders.map((dataHolder) => {
						const { dataSources, id } = dataHolder;
						const dataItemIds = dataSources.map(({ id }) => id);
						const dataValues = sanitizedAnalyticsData.filter(
							(value) => {
								return dataItemIds.includes(value.dx as string);
							},
						);
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
							dataValues,
							dataHolder,
						};
					});
				})
				.flat()
				.map((data, index) => ({ ...data, count: index + 1 }));
		}

		return meta.orgUnits
			.map((orgUnit, i) => {
				const dataValues = sanitizedAnalyticsData.filter((value) => {
					return orgUnit.uid === value.ou;
				});

				const label = showHierarchy
					? orgUnit.hierarchy.replace("/", "") ?? ""
					: orgUnit.name ?? "";

				return {
					dataValues,
					label,
					orgUnit,
				};
			})
			.flat()
			.map((data, index) => ({ ...data, count: index + 1 }));
	}

	const totalAverage = getAverageValue({
		dataValues: sanitizedAnalyticsData,
		meta,
	});

	if (averageFilter === "BELOW_AVERAGE") {
		if (dataInRows) {
			//Rows are derived from groups
			const dataGroups = config.dataSelection.dataGroups;
			return compact(
				dataGroups.map(({ dataHolders }) => {
					return dataHolders.map((dataHolder) => {
						const { dataSources, id } = dataHolder;
						const dataItemIds = dataSources.map(({ id }) => id);
						const dataValues = sanitizedAnalyticsData.filter(
							(value) => {
								return dataItemIds.includes(value.dx as string);
							},
						);

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
							dataValues,
							dataHolder,
						};
					});
				}),
			)
				.flat()
				.filter((data) => {
					const average = getAverageValue({
						meta,
						dataValues: data.dataValues,
					});

					return average <= totalAverage;
				})
				.map((data, index) => ({ ...data, count: index + 1 }));
		}

		return meta.orgUnits
			.map((orgUnit, i) => {
				const dataValues = sanitizedAnalyticsData.filter((value) => {
					return orgUnit.uid === value.ou;
				});

				const label = showHierarchy
					? orgUnit.hierarchy.replace("/", "") ?? ""
					: orgUnit.name ?? "";

				return {
					dataValues,
					label,
					orgUnit,
				};
			})
			.flat()
			.filter((data) => {
				const average = getAverageValue({
					meta,
					dataValues: data.dataValues,
				});

				return average <= totalAverage;
			})
			.map((data, index) => ({ ...data, count: index + 1 }));
	} else {
		if (dataInRows) {
			//Rows are derived from groups
			const dataGroups = config.dataSelection.dataGroups;
			return compact(
				dataGroups.map(({ dataHolders }) => {
					return dataHolders.map((dataHolder) => {
						const { dataSources, id } = dataHolder;
						const dataItemIds = dataSources.map(({ id }) => id);
						const dataValues = sanitizedAnalyticsData.filter(
							(value) => {
								return dataItemIds.includes(value.dx as string);
							},
						);

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
							dataValues,
							dataHolder,
						};
					});
				}),
			)
				.flat()
				.filter((data) => {
					const average = getAverageValue({
						meta,
						dataValues: data.dataValues,
					});

					return average >= totalAverage;
				})
				.map((data, index) => ({ ...data, count: index + 1 }));
		}

		return meta.orgUnits
			.map((orgUnit, i) => {
				const dataValues = sanitizedAnalyticsData.filter((value) => {
					return orgUnit.uid === value.ou;
				});

				const label = showHierarchy
					? orgUnit.hierarchy.replace("/", "") ?? ""
					: orgUnit.name ?? "";

				return {
					dataValues,
					label,
					orgUnit,
				};
			})
			.flat()
			.filter((data) => {
				const average = getAverageValue({
					meta,
					dataValues: data.dataValues,
				});

				return average >= totalAverage;
			})
			.map((data, index) => ({ ...data, count: index + 1 }));
	}
}
