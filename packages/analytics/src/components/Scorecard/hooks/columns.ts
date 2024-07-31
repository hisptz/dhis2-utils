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
import i18n from "@dhis2/d2-i18n";
import { HeaderCell } from "../components/ScorecardTable/components/HeaderCell";
import { ExpandCell } from "../components/ScorecardTable/components/ExpandCell";

const columnHelper = createColumnHelper<ScorecardTableData>();

export function useMetaColumns() {
	const state = useScorecardState();
	const metaColumns: ColumnDef<ScorecardTableData, any>[] = [
		columnHelper.accessor("expand", {
			id: "expand",
			header: "",
			meta: {
				isMeta: true,
				fixed: true,
			},
			cell: ExpandCell,
		}),
		columnHelper.accessor("count", {
			header: "",
			id: "count",
			meta: {
				isMeta: true,
				fixed: true,
			},
			cell: HeaderCell,
		}),
	];

	if (state?.options?.showDataInRows) {
		metaColumns.push(
			columnHelper.accessor("label", {
				id: "label",
				header: i18n.t("Data Items"),
				meta: {
					isMeta: true,
					fixed: true,
				},
				cell: HeaderCell,
			}),
		);
	} else {
		metaColumns.push(
			columnHelper.accessor("label", {
				id: "orgUnits",
				header: i18n.t("Organisation Unit"),
				meta: {
					isMeta: true,
					fixed: true,
				},
				cell: HeaderCell,
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
			[...metaColumns];

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
