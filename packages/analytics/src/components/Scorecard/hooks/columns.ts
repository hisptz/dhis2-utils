import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
	useScorecardConfig,
	useScorecardMeta,
	useScorecardState,
} from "../components";
import { useMemo } from "react";
import {
	type ScorecardTableCellConfig,
	type ScorecardTableData,
} from "../schemas/config";
import {
	getAverageColumn,
	getDataColumnHeaders,
	getOrgUnitColumnHeaders,
} from "../utils/columns";
import { LabelCell } from "../components/ScorecardTable/components/TableHeader/components/LabelCell";
import { ExpandCell } from "../components/ScorecardTable/components/TableHeader/components/ExpandCell";
import { NumberCell } from "../components/ScorecardTable/components/TableHeader/components/NumberCell";
import { MetaHeaderCell } from "../components/ScorecardTable/components/TableHeader/components/MetaHeaderCell";
import { useCalendar } from "./metadata";
import { MetaFooterCell } from "../components/ScorecardTable/components/MetaFooterCell";
import { getOrgUnitLevel } from "../utils/orgUnits";
import { useLowestOrgUnitLevel } from "./orgUnit";

const columnHelper = createColumnHelper<ScorecardTableData>();

export function useMetaColumns() {
	const state = useScorecardState();

	const lowestLevel = useLowestOrgUnitLevel();

	const metaColumns: ColumnDef<ScorecardTableData, any>[] = [
		columnHelper.accessor(
			(rowData) => {
				if (state?.options?.disableExpanding) {
					return false;
				}

				const dataInRows = state?.options?.showDataInRows;
				if (dataInRows) {
					return false;
				}

				if (!lowestLevel) {
					return false;
				}

				const orgUnit = rowData.orgUnit;
				if (!orgUnit) {
					return false;
				}
				const ouLevel = getOrgUnitLevel(orgUnit);

				return ouLevel !== lowestLevel.level;
			},
			{
				id: "expand",
				header: () => null,
				meta: {
					isMeta: true,
					fixed: true,
					label: "",
				},
				enableColumnFilter: false,
				cell: ExpandCell,
				footer: () => null,
			},
		),
		columnHelper.accessor(
			(_, index) => {
				return index + 1;
			},
			{
				id: "count",
				header: () => null,
				meta: {
					isMeta: true,
					fixed: true,
					label: "",
				},
				enableColumnFilter: false,
				cell: NumberCell,
				footer: () => null,
			},
		),
	];

	if (state?.options?.showDataInRows) {
		metaColumns.push(
			columnHelper.accessor("label", {
				header: () => null,
				id: "dataItems",
				meta: {
					filterable: true,
				},
				enableColumnFilter: true,
				cell: LabelCell,
				footer: MetaFooterCell,
			}),
		);
	} else {
		metaColumns.push(
			columnHelper.accessor("label", {
				header: () => null,
				id: "orgUnits",
				enableColumnFilter: true,
				meta: {
					isMeta: true,
					fixed: true,
				},
				cell: LabelCell,
				footer: MetaFooterCell,
			}),
		);
	}

	return metaColumns;
}

export function useTableColumns(): ColumnDef<
	ScorecardTableData,
	ScorecardTableCellConfig
>[] {
	const config = useScorecardConfig();
	const meta = useScorecardMeta();
	const state = useScorecardState();
	const metaColumns = useMetaColumns();
	const calendar = useCalendar();

	if (!config || !meta || !state) {
		return [];
	}
	return useMemo(() => {
		const columns: ColumnDef<ScorecardTableData, any>[] = [
			columnHelper.group({
				id: "metaHeader",
				columns: metaColumns,
				header: MetaHeaderCell,
				footer: () => null,
			}),
		];

		if (state.options.showDataInRows) {
			columns.push(
				...getOrgUnitColumnHeaders({
					meta,
					calendar,
				}),
			);
		} else {
			columns.push(
				...getDataColumnHeaders({
					meta,
					config,
					calendar,
				}),
			);
		}

		columns.push(
			getAverageColumn({
				meta,
				config,
			}),
		);

		return columns;
	}, [
		state.options.showDataInRows,
		state.periodSelection,
		state.orgUnitSelection,
	]);
}
