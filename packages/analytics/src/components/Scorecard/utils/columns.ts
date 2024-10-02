import type { ScorecardMeta } from "../components";
import type {
	ScorecardAnalyticsData,
	ScorecardConfig,
	ScorecardDataHolder,
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
import { DataHeaderCell } from "../components/ScorecardTable/components/TableHeader/components/DataHeaderCell";
import {
	createFixedPeriodFromPeriodId,
	getAdjacentFixedPeriods,
} from "@dhis2/multi-calendar-dates";
import type { SupportedCalendar } from "@dhis2/multi-calendar-dates/build/types/types";
import { AverageCell } from "../components/ScorecardTable/components/AverageCell";
import { AverageHeaderCell } from "../components/ScorecardTable/components/TableHeader/components/AverageHeaderCell";
import { DataFooterCell } from "../components/ScorecardTable/components/DataFooterCell";
import { AverageFooterCell } from "../components/ScorecardTable/components/AverageFooterCell";

const columnHelper = createColumnHelper<ScorecardTableData>();

function sortingFunction(
	rowA: Row<ScorecardTableData>,
	rowB: Row<ScorecardTableData>,
	columnId: string,
) {
	const dataA = rowA.getValue(columnId) as ScorecardTableCellConfig;
	const dataB = rowB.getValue(columnId) as ScorecardTableCellConfig;

	const valueA = 0;
	const valueB = 0;

	if (valueA === valueB) {
		return 0;
	}

	return valueA > valueB ? 1 : -1;
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
}: {
	meta: ScorecardMeta;
	calendar: SupportedCalendar;
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
						id: `${orgUnit.uid}-${uid}`,
						enableSorting: true,
						sortingFn: sortingFunction,
						footer: DataFooterCell,
					},
				),
			),
		});
	});
}

export function getAverageColumn({
	meta,
}: {
	meta: ScorecardMeta;
	config: ScorecardConfig;
}) {
	return columnHelper.group({
		id: "average-header",
		header: AverageHeaderCell,
		columns: [
			columnHelper.accessor(
				(rowData) => {
					return {
						...rowData,
						dataSources: rowData.dataHolder?.dataSources,
					};
				},
				{
					id: `average`,
					header: () => null,
					cell: AverageCell,
					enableHiding: true,
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
}: {
	hasOnePeriod: boolean;
	dataHolder: ScorecardDataHolder;
	periods: ItemMeta[];
	calendar: SupportedCalendar;
}) {
	const { id, dataSources } = dataHolder;

	const header =
		dataSources.length === 1
			? head(dataSources)?.label
			: dataSources.reduce(
					(acc, { label, id }) => `${acc} / ${label}`,
					"",
				);

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
				},
				id: id.toString(),
				cell: DataContainer,
				enableSorting: true,
				sortingFn: sortingFunction,
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
					id: `${id.toString()}-${uid}`,
					enableSorting: true,
					sortingFn: sortingFunction,
					footer: DataFooterCell,
				},
			),
		),
		meta: {
			label: header,
		},
		header: DataHeaderCell,
		enableSorting: true,
		sortingFn: sortingFunction,
	});
}

export function getDataColumnHeaders({
	meta,
	config,
	calendar,
}: {
	meta: ScorecardMeta;
	config: ScorecardConfig;
	calendar: SupportedCalendar;
}): ColumnDef<ScorecardTableData, ScorecardTableCellConfig>[] {
	const dataGroups = config.dataSelection.dataGroups ?? [];
	const hasOneGroup = dataGroups.length === 1;
	const periods = meta.periods ?? [];
	const hasOnePeriod = periods.length === 1;

	if (hasOneGroup) {
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
					});
				}),
				enableSorting: false,
				footer: () => null,
			});
		});
	}
}
