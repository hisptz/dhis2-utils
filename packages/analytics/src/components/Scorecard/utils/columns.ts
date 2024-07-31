import type { ScorecardMeta } from "../components/MetaProvider";
import type {
	ScorecardConfig,
	ScorecardDataHolder,
	ScorecardTableCellData,
	ScorecardTableData,
} from "../schemas/config";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { head } from "lodash";
import type { ItemMeta } from "../hooks/metadata";
import { DataContainer } from "../components/ScorecardTable/components/DataContainer";

const columnHelper = createColumnHelper<ScorecardTableData>();

export function getOrgUnitColumnHeaders({
	meta,
}: {
	meta: ScorecardMeta;
}): ColumnDef<ScorecardTableData, ScorecardTableCellData>[] {
	const orgUnits = meta.orgUnits ?? [];
	const periods = meta.periods ?? [];
	return orgUnits.map((orgUnit) => {
		const hasOnePeriod = periods.length === 1;
		if (hasOnePeriod) {
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
							return {
								...dataSource,
								data: dataSourceValues,
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
					header: orgUnit.name,
					id: orgUnit.uid,
				},
			);
		} else {
			return columnHelper.group({
				id: orgUnit.uid,
				header: orgUnit.name,
				columns: periods.map(({ name, uid }) =>
					columnHelper.accessor(
						(rowData) => {
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
										return {
											...dataSource,
											data: dataSourceValues,
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
							header: name,
							cell: DataContainer,
							id: `${orgUnit.uid}-${uid}`,
						},
					),
				),
			});
		}
	});
}

function getDataHolderColumn({
	hasOnePeriod,
	dataHolder,
	periods,
}: {
	hasOnePeriod: boolean;
	dataHolder: ScorecardDataHolder;
	periods: ItemMeta[];
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
				const dataSourceWithValues = dataSources.map((dataSource) => {
					const values = rowData.dataValues.filter(({ dx }) => {
						return dx === dataSource.id;
					});
					return {
						...dataSource,
						data: values,
					};
				});
				return {
					...rowData,
					dataSources: dataSourceWithValues,
					period: head(periods)?.uid,
				} as ScorecardTableCellData;
			},
			{
				header,
				id: id.toString(),
				cell: DataContainer,
			},
		);
	}

	return columnHelper.group({
		id: id.toString(),
		columns: periods.map(({ name, uid }) =>
			columnHelper.accessor(
				(rowData) => {
					const dataSourceWithValues = dataSources.map(
						(dataSource) => {
							const values = rowData.dataValues.filter(
								({ dx }) => {
									return dx === dataSource.id;
								},
							);
							return {
								...dataSource,
								data: values,
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
					header: name,
					cell: DataContainer,
					id: `${id.toString()}-${uid}`,
				},
			),
		),
		header,
	});
}

export function getDataColumnHeaders({
	meta,
	config,
}: {
	meta: ScorecardMeta;
	config: ScorecardConfig;
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
			});
		});
	} else {
		return dataGroups.map(({ title, dataHolders }) => {
			return columnHelper.group({
				header: title,
				columns: dataHolders.map((dataHolder) => {
					return getDataHolderColumn({
						hasOnePeriod,
						dataHolder,
						periods,
					});
				}),
			});
		});
	}
}
