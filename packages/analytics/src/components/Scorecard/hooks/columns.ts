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
	getDataColumnHeaders,
	getOrgUnitColumnHeaders,
} from "../utils/columns";
import { LabelCell } from "../components/ScorecardTable/components/TableHeader/components/LabelCell";
import { ExpandCell } from "../components/ScorecardTable/components/TableHeader/components/ExpandCell";
import { NumberCell } from "../components/ScorecardTable/components/TableHeader/components/NumberCell";
import { MetaHeaderCell } from "../components/ScorecardTable/components/TableHeader/components/MetaHeaderCell";

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
		columnHelper.accessor("count", {
			id: "count",
			header: () => null,
			meta: {
				isMeta: true,
				fixed: true,
				label: "",
			},
			enableColumnFilter: false,
			cell: NumberCell,
		}),
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

	if (!config || !meta || !state) {
		return [];
	}
	return useMemo(() => {
		const columns: ColumnDef<ScorecardTableData, ScorecardTableCellData>[] =
			[
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
				}),
			);
		} else {
			columns.push(
				...getDataColumnHeaders({
					meta,
					config,
				}),
			);
		}

		return columns;
	}, [state.options.showDataInRows]);
}
