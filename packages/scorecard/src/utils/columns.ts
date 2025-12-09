import type { ScorecardMeta } from "../components";
import type {
	ScorecardAnalyticsData,
	ScorecardCellData,
	ScorecardConfig,
	ScorecardDataHolder,
	ScorecardTableAverageCellConfig,
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../schemas/config";
import {
	type ColumnDef,
	createColumnHelper,
	type Row,
} from "@tanstack/react-table";
import { head, sum } from "lodash";
import type { ItemMeta } from "../hooks/metadata";
import { DataContainer } from "../components/ScorecardTable/components/DataContainer";
import {
	DataHeaderCell,
	EmptyDataHeaderCell,
} from "../components/ScorecardTable/components/TableHeader/components/DataHeaderCell";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import type { SupportedCalendar } from "@dhis2/multi-calendar-dates/build/types/types";
import { AverageCell } from "../components/ScorecardTable/components/AverageCell";
import { AverageHeaderCell } from "../components/ScorecardTable/components/TableHeader/components/AverageHeaderCell";
import { DataFooterCell } from "../components/ScorecardTable/components/DataFooterCell";
import { AverageFooterCell } from "../components/ScorecardTable/components/AverageFooterCell";
import type { ScorecardDataEngine } from "./dataEngine";
import type { AnalyticsData } from "./data";

const columnHelper = createColumnHelper<ScorecardTableData>();

function getValueFromConfig({
	config,
	data,
}: {
	config: ScorecardTableCellConfig;
	data: AnalyticsData[];
}): ScorecardCellData {
	const dataValues = data.filter((datum) => {
		return (
			config.orgUnit.uid === datum.ou &&
			config.currentPeriod === datum.pe &&
			datum.dx === head(config.dataSources)!.id
		);
	});

	return {
		...head(config.dataSources)!,
		data: getValues({
			values: dataValues,
			currentPeriod: config.currentPeriod!,
			previousPeriod: config.previousPeriod,
		}),
	};
}

function getSortingFunction(dataEngine: ScorecardDataEngine) {
	return function sortingFunction(
		rowA: Row<ScorecardTableData>,
		rowB: Row<ScorecardTableData>,
		columnId: string,
	) {
		if (!dataEngine.getIsCompleteSnapshot()) {
			return 0;
		}

		const dataA = rowA.getValue(columnId) as ScorecardTableCellConfig;
		const dataB = rowB.getValue(columnId) as ScorecardTableCellConfig;

		const dataAValue = getValueFromConfig({
			config: dataA,
			data: Array.from(dataEngine.data.values()),
		});

		const dataBValue = getValueFromConfig({
			config: dataB,
			data: Array.from(dataEngine.data.values()),
		});

		const valueA = dataAValue.data.current ?? 0;
		const valueB = dataBValue.data.current ?? 0;

		if (valueA === valueB) {
			return 0;
		}

		return valueA > valueB ? 1 : -1;
	};
}

export function getAverageValue({
	dataValues,
	meta,
}: {
	dataValues: ScorecardAnalyticsData[];
	meta: ScorecardMeta;
}) {
	const currentPeriodValues = dataValues.filter(({ pe }) => {
		return !!meta.periods.find(({ uid }) => uid === pe);
	});
	const values = currentPeriodValues.map(({ value }) => (value ? +value : 0));

	return Math.round((sum(values) / values.length) * 100) / 100;
}

export function getValues({
	values,
	currentPeriod,
	previousPeriod,
}: {
	values: ScorecardAnalyticsData[];
	currentPeriod: string;
	previousPeriod?: string;
}) {
	const currentValueData = values.find(({ pe }) => {
		return pe === currentPeriod;
	});

	const previousValueData = values.find(({ pe }) => {
		return pe === previousPeriod;
	});

	const previousValue = parseFloat(previousValueData?.value ?? "");
	const currentValue = parseFloat(currentValueData?.value ?? "");

	return {
		previous: isNaN(previousValue) ? undefined : previousValue,
		current: isNaN(currentValue) ? undefined : currentValue,
	};
}

export function getOrgUnitColumnHeaders({
	meta,
	calendar,
	dataEngine,
}: {
	meta: ScorecardMeta;
	calendar: SupportedCalendar;
	dataEngine: ScorecardDataEngine;
}): ColumnDef<ScorecardTableData, ScorecardTableCellConfig>[] {
	const orgUnits = meta.orgUnits ?? [];
	const periods = meta.periods ?? [];
	return orgUnits.map((orgUnit) => {
		return columnHelper.group({
			id: orgUnit.uid,
			header: DataHeaderCell,
			meta: {
				label: orgUnit.name,
			},
			columns: periods.map(({ name, uid }) =>
				columnHelper.accessor(
					(rowData) => {
						const currentPeriod = uid;
						const previousPeriod = head(
							getAdjacentFixedPeriods({
								calendar,
								period: createFixedPeriodFromPeriodId({
									calendar,
									periodId: currentPeriod,
								}),
								steps: -1,
							}),
						)?.id;
						const dataSources = rowData.dataHolder?.dataSources;
						return {
							currentPeriod,
							previousPeriod,
							dataSources,
							orgUnit: orgUnit,
						} as ScorecardTableCellConfig;
					},
					{
						header: DataHeaderCell,
						meta: {
							label: name,
						},
						cell: DataContainer,
						size: 120,
						id: `${orgUnit.uid}-${uid}`,
						enableSorting: true,
						sortingFn: getSortingFunction(dataEngine),
						footer: DataFooterCell,
					},
				),
			),
		});
	});
}

export function getAverageColumn({}: {
	meta: ScorecardMeta;
	config: ScorecardConfig;
}): ColumnDef<ScorecardTableData, ScorecardTableAverageCellConfig> {
	return columnHelper.group({
		id: "average-header",
		header: AverageHeaderCell,
		columns: [
			columnHelper.accessor(
				(rowData) => {
					return {
						...rowData,
					};
				},
				{
					id: `average`,
					header: () => null,
					cell: AverageCell,
					enableHiding: true,
					size: 120,
					footer: AverageFooterCell,
				},
			),
		],
	});
}

function getDataHolderColumn({
	hasOnePeriod,
	dataHolder,
	periods,
	calendar,
	dataEngine,
}: {
	hasOnePeriod: boolean;
	dataHolder: ScorecardDataHolder;
	periods: ItemMeta[];
	calendar: SupportedCalendar;
	dataEngine: ScorecardDataEngine;
}) {
	const { id, dataSources } = dataHolder;

	const header =
		dataSources.length === 1
			? head(dataSources)?.label
			: dataSources.reduce(
					(acc, { label }, index) =>
						index === 0 ? `${label}` : `${acc} / ${label}`,
					"",
				);

	const legends = dataSources.map(({ legends, id, label }) => ({
		id,
		label,
		legends,
	}));

	if (hasOnePeriod) {
		return columnHelper.accessor(
			(rowData) => {
				const currentPeriod = head(periods)!.uid;
				const previousPeriod = head(
					getAdjacentFixedPeriods({
						calendar,
						period: createFixedPeriodFromPeriodId({
							calendar,
							periodId: currentPeriod,
						}),
						steps: -1,
					}),
				)?.id;

				return {
					...rowData,
					dataSources,
					previousPeriod,
					currentPeriod,
				} as ScorecardTableCellConfig;
			},
			{
				header: DataHeaderCell,
				meta: {
					label: header,
					legends,
				},
				id: id.toString(),
				cell: DataContainer,
				size: 120,
				enableSorting: true,
				sortingFn: getSortingFunction(dataEngine),
				footer: DataFooterCell,
			},
		);
	}

	return columnHelper.group({
		id: id.toString(),
		columns: periods.map(({ name, uid }) =>
			columnHelper.accessor(
				(rowData) => {
					const currentPeriod = uid;
					const previousPeriod = head(
						getAdjacentFixedPeriods({
							calendar,
							period: createFixedPeriodFromPeriodId({
								calendar,
								periodId: currentPeriod,
							}),
							steps: -1,
						}),
					)?.id;
					return {
						...rowData,
						dataSources,
						currentPeriod,
						previousPeriod,
					} as ScorecardTableCellConfig;
				},
				{
					header: DataHeaderCell,
					meta: {
						label: name,
					},
					cell: DataContainer,
					size: 120,
					id: `${id.toString()}-${uid}`,
					enableSorting: true,
					sortingFn: getSortingFunction(dataEngine),
					footer: DataFooterCell,
				},
			),
		),
		meta: {
			label: header,
		},
		header: DataHeaderCell,
		enableSorting: true,
		sortingFn: getSortingFunction(dataEngine),
	});
}

export function getDataColumnHeaders({
	meta,
	config,
	calendar,
	dataEngine,
}: {
	meta: ScorecardMeta;
	config: ScorecardConfig;
	calendar: SupportedCalendar;
	dataEngine: ScorecardDataEngine;
}): ColumnDef<ScorecardTableData, ScorecardTableCellConfig>[] {
	const dataGroups = config.dataSelection.dataGroups ?? [];
	const hasOneGroup = dataGroups.length === 1;
	const periods = meta.periods ?? [];
	const hasOnePeriod = periods.length === 1;

	if (hasOneGroup) {
		return dataGroups.map(({ title, dataHolders, id }) => {
			return columnHelper.group({
				id: id.toString(),
				header: EmptyDataHeaderCell,
				meta: {
					label: title,
					bold: true,
				},
				columns: dataHolders.map((dataHolder) => {
					return getDataHolderColumn({
						hasOnePeriod,
						dataHolder,
						periods,
						calendar,
						dataEngine,
					});
				}),
				enableSorting: false,
				footer: () => null,
			});
		});
	} else {
		return dataGroups.map(({ title, dataHolders, id }) => {
			return columnHelper.group({
				id: id.toString(),
				header: DataHeaderCell,
				meta: {
					label: title,
					bold: true,
				},
				columns: dataHolders.map((dataHolder) => {
					return getDataHolderColumn({
						hasOnePeriod,
						dataHolder,
						periods,
						calendar,
						dataEngine,
					});
				}),
				enableSorting: false,
				footer: () => null,
			});
		});
	}
}
