import { createContext, memo, type ReactNode, useContext } from "react";
import {
	getCoreRowModel,
	type TableOptions,
	useReactTable,
} from "@tanstack/react-table";
import { useTableSetup } from "../hooks/table";
import type { ScorecardTableData } from "../schemas/config";
import { useBoolean } from "usehooks-ts";

const TableStateContext = createContext<TableOptions<ScorecardTableData>>({
	state: {},
	columns: [],
	getCoreRowModel: getCoreRowModel(),
	data: [],
});

const TableLoadingStateContext = createContext<boolean>(false);
const TableLoadingStateToggleContext = createContext<() => void>(() => {});

export function useTableState() {
	const context = useContext(TableStateContext);
	return useReactTable<ScorecardTableData>(context);
}

export function useToggleTableLoadingState() {
	return useContext(TableLoadingStateToggleContext);
}

export function useTableLoadingState() {
	return useContext(TableLoadingStateContext);
}

export function TableLoadingStateProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { value: loading, toggle } = useBoolean(false);

	return (
		<TableLoadingStateToggleContext.Provider value={toggle}>
			<TableLoadingStateContext.Provider value={loading}>
				{children}
			</TableLoadingStateContext.Provider>
		</TableLoadingStateToggleContext.Provider>
	);
}

export const TableStateProvider = memo(function TableStateProvider({
	children,
}: {
	children: ReactNode;
}) {
	const options = useTableSetup();
	return (
		<TableStateContext.Provider value={options}>
			<TableLoadingStateProvider>{children}</TableLoadingStateProvider>
		</TableStateContext.Provider>
	);
});
