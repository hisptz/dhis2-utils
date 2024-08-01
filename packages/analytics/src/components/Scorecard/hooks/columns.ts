import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useScorecardConfig } from "../components/ConfigProvider";
import { useScorecardMeta } from "../components/MetaProvider";
import { useScorecardState } from "../components/StateProvider";
import { useMemo } from "react";
import {
	type ScorecardTableCellData,
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

const columnHelper = createColumnHelper<ScorecardTableData>();

export function useMetaColumns() {
	const state = useScorecardState();
	const metaColumns: ColumnDef<ScorecardTableData, any>[] = [
		columnHelper.accessor("expand", {
			id: "expand",
			header: () => null,
			meta: {
				isMeta: true,
				fixed: true,
				label: "",
			},
			enableColumnFilter: false,
			cell: ExpandCell,
		}),
		columnHelper.accessor(
			(rowData, index) => {
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
			}),
		);
	}

	return metaColumns;
}

export function useTableColumns(): ColumnDef<
	ScorecardTableData,
	ScorecardTableCellData
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
	}, [state.options.showDataInRows]);
}
