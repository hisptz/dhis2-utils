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
	useScorecardState,
} from "../components";
import { getRowsFromMeta } from "../utils/data";

function useTableRows(): ScorecardTableData[] {
	const meta = useScorecardMeta();
	const state = useScorecardState();
	const config = useScorecardConfig();
	if (meta == null) return [];

	return useMemo(
		() => getRowsFromMeta({ meta, state, config }),
		[meta, state, config],
	);
}

export function useTableSetup(): TableOptions<ScorecardTableData> {
	const state = useScorecardState();
	const showAverageColumn = state?.options?.averageColumn ?? false;
	const showItemNumber = state?.options?.itemNumber ?? false;
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
