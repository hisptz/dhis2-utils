import { createContext, type ReactNode, useContext } from "react";
import {
	getCoreRowModel,
	type TableOptions,
	useReactTable,
} from "@tanstack/react-table";
import { useTableSetup } from "../hooks/table";
import type { ScorecardTableData } from "../schemas/config";

const TableStateContext = createContext<TableOptions<ScorecardTableData>>({
	state: {},
	columns: [],
	getCoreRowModel: getCoreRowModel(),
	data: [],
});

export function useTableState() {
	const context = useContext(TableStateContext);
	return useReactTable<ScorecardTableData>(context);
}

export function TableStateProvider({ children }: { children: ReactNode }) {
	const options = useTableSetup();

	console.log("Re-rendering table state");

	return (
		<TableStateContext.Provider value={options}>
			{children}
		</TableStateContext.Provider>
	);
}
