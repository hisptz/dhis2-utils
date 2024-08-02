import type { ScorecardMeta } from "../components/MetaProvider";
import type {
	ScorecardAnalyticsData,
	ScorecardConfig,
	ScorecardDataHolder,
	ScorecardTableCellData,
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
import { EmptyFooterCell } from "../components/ScorecardTable/components/EmptyFooterCell";

const columnHelper = createColumnHelper<ScorecardTableData>();

function sortingFunction(
	rowA: Row<ScorecardTableData>,
	rowB: Row<ScorecardTableData>,
	columnId: string,
) {
	const dataA = rowA.getValue(columnId) as ScorecardTableCellData;
	const dataB = rowB.getValue(columnId) as ScorecardTableCellData;

	const valueA = head(dataA.dataSources)?.data.current ?? 0;
	const valueB = head(dataB.dataSources)?.data.current ?? 0;

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

function getValues({
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
}): ColumnDef<ScorecardTableData, ScorecardTableCellData>[] {
	const orgUnits = meta.orgUnits ?? [];
	const periods = meta.periods ?? [];
	return orgUnits.map((orgUnit) => {
		const hasOnePeriod = periods.length === 1;
		if (hasOnePeriod) {
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
			return columnHelper.accessor(
				(rowData) => {
					const values = rowData.dataValues.filter(({ ou }) => {
						return ou === orgUnit.uid;
					});
					const dataSources = rowData.dataHolder?.dataSources?.map(
						(dataSource) => {
							const dataSourceValues = values.filter((value) => {
								return value.dx === dataSource.id;
							});

							const data = getValues({
								currentPeriod,
								previousPeriod,
								values: dataSourceValues,
							});

							return {
								...dataSource,
								data,
							};
						},
					);
					return {
						...rowData,
						period: head(periods)?.uid,
						dataSources,
						orgUnit: orgUnit,
					} as ScorecardTableCellData;
				},
				{
					meta: {
						label: orgUnit.name,
					},
					header: DataHeaderCell,
					id: orgUnit.uid,
					enableSorting: true,
					sortingFn: sortingFunction,
					footer: DataFooterCell,
				},
			);
		} else {
			return columnHelper.group({
				id: orgUnit.uid,
				meta: {
					label: orgUnit.name,
				},
				header: DataHeaderCell,
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

							const values = rowData.dataValues.filter(
								({ ou }) => {
									return ou === orgUnit.uid;
								},
							);

							const dataSources =
								rowData.dataHolder?.dataSources?.map(
									(dataSource) => {
										const dataSourceValues = values.filter(
											(value) => {
												return (
													value.dx === dataSource.id
												);
											},
										);

										const data = getValues({
											currentPeriod,
											previousPeriod,
											values: dataSourceValues,
										});

										return {
											...dataSource,
											data,
										};
									},
								);

							return {
								...rowData,
								period: uid,
								dataSources,
								orgUnit: orgUnit,
							} as ScorecardTableCellData;
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
		}
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
					return getAverageValue({
						dataValues: rowData.dataValues,
						meta,
					});
				},
				{
					id: `average`,
					header: () => null,
					cell: AverageCell,
					enableHiding: true,
					footer: EmptyFooterCell,
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

				const dataSourceWithValues = dataSources.map((dataSource) => {
					const values = rowData.dataValues.filter(({ dx }) => {
						return dx === dataSource.id;
					});

					const data = getValues({
						currentPeriod,
						previousPeriod,
						values,
					});

					return {
						...dataSource,
						data,
					};
				});
				return {
					...rowData,
					dataSources: dataSourceWithValues,
					period: head(periods)?.uid,
				} as ScorecardTableCellData;
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
					const dataSourceWithValues = dataSources.map(
						(dataSource) => {
							const values = rowData.dataValues.filter(
								({ dx }) => {
									return dx === dataSource.id;
								},
							);

							const data = getValues({
								currentPeriod,
								previousPeriod,
								values,
							});

							return {
								...dataSource,
								data,
							};
						},
					);
					return {
						...rowData,
						dataSources: dataSourceWithValues,
						period: uid,
					} as ScorecardTableCellData;
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
}): ColumnDef<ScorecardTableData, ScorecardTableCellData>[] {
	const dataGroups = config.dataSelection.dataGroups ?? [];
	const hasOneGroup = dataGroups.length === 1;
	const periods = meta.periods ?? [];
	const hasOnePeriod = periods.length === 1;

	if (hasOneGroup) {
		return head(dataGroups)!.dataHolders.map((dataHolder) => {
			return getDataHolderColumn({
				hasOnePeriod,
				dataHolder,
				periods,
				calendar,
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
