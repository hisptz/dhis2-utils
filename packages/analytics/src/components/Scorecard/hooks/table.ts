import {
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type TableOptions,
} from "@tanstack/react-table";
import { useTableColumns } from "./columns";
import type { ScorecardTableData } from "../schemas/config";
import { useScorecardData } from "../components/DataProvider";
import { useState } from "react";

export function useTableSetup(): TableOptions<ScorecardTableData> {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useTableColumns();
	const { data } = useScorecardData();

	return {
		columns,
		data,
		state: {
			columnFilters,
			sorting,
		},
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
	};
}
