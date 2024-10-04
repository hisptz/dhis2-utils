import { DataTableBody } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { TableRow } from "./DataRow";
import { LoadingIndicator } from "../../LoadingIndicator";
import { memo, type RefObject, useMemo } from "react";
import { ScorecardDataFetchProgressProvider } from "../../DataProvider";
import { useVirtualizer } from "@tanstack/react-virtual";

export const TableBody = memo(function TableBody({
	tableRef,
}: {
	tableRef: RefObject<HTMLTableElement>;
}) {
	const table = useTableState();
	const rows = useMemo(
		() => table.getRowModel().rows,
		[table.getRowModel().rows],
	);

	const enabled = false; //TODO: Work for smooth scroll first

	const virtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () =>
			(tableRef.current?.parentElement as HTMLDivElement) ?? null,
		enabled,
		overscan: 5,
		measureElement:
			typeof window !== "undefined" &&
			navigator.userAgent.indexOf("Firefox") === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		estimateSize: () => 60,
	});

	return (
		<DataTableBody>
			<ScorecardDataFetchProgressProvider>
				<LoadingIndicator tableRef={tableRef} />
			</ScorecardDataFetchProgressProvider>
			{enabled
				? virtualizer.getVirtualItems().map((virtualRow) => {
						const row = rows[virtualRow.index];
						return (
							<TableRow
								virtualizer={virtualizer}
								virtualRow={virtualRow}
								key={row.id}
								row={row}
							/>
						);
					})
				: rows.map((row) => <TableRow key={row.id} row={row} />)}
		</DataTableBody>
	);
});
