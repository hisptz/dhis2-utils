import {
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type TableOptions,
	type VisibilityState,
} from "@tanstack/react-table";
import { useTableColumns } from "./columns";
import type { ScorecardTableData } from "../schemas/config";
import { useMemo, useState } from "react";
import {
	useScorecardConfig,
	useScorecardMeta,
	useScorecardStateSelector,
} from "../components";
import { getRowsFromMeta } from "../utils/data";

function useTableRows(): ScorecardTableData[] {
	const meta = useScorecardMeta();
	const showDataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);
	const showHierarchy = useScorecardStateSelector<boolean>([
		"options",
		"showHierarchy",
	]);
	const config = useScorecardConfig();
	if (meta == null) return [];

	return useMemo(
		() => getRowsFromMeta({ meta, showDataInRows, showHierarchy, config }),
		[meta, showDataInRows, showHierarchy, config],
	);
}

export function useTableSetup(): TableOptions<ScorecardTableData> {
	const showAverageColumn = useScorecardStateSelector<boolean>([
		"options",
		"averageColumn",
	]);
	const showItemNumber = useScorecardStateSelector<boolean>([
		"options",
		"itemNumber",
	]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		average: showAverageColumn,
		count: showItemNumber,
	});

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useTableColumns();
	const data = useTableRows();

	return {
		columns,
		data,
		state: {
			columnFilters,
			sorting,
			columnVisibility,
		},
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
	};
}
