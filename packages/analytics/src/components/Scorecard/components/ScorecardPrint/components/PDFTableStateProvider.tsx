import { createContext, memo, type ReactNode, useContext } from "react";
import { useReactTable } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";

const TableStateContext = createContext<ReturnType<
	typeof useReactTable<ScorecardTableData>
> | null>(null);

export function usePDFTableState() {
	const context = useContext(TableStateContext);
	if (!context) {
		throw "usePDFTableState only works under PDFTableStateProvider";
	}
	return context;
}

export const PDFTableStateProvider = memo(function TableStateProvider({
	children,
	table,
}: {
	children: ReactNode;
	table: ReturnType<typeof useReactTable<ScorecardTableData>>;
}) {
	return (
		<TableStateContext.Provider value={table}>
			{children}
		</TableStateContext.Provider>
	);
});
