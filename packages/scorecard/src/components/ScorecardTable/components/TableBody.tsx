import { DataTableBody } from "@dhis2/ui";
import { useTableLoadingState, useTableState } from "../../TableStateProvider";
import { TableRow } from "./DataRow";
import { memo, type RefObject, useMemo } from "react";
import { LoadingIndicator } from "../../LoadingIndicator";

export const TableBody = memo(function TableBody({
	tableRef,
}: {
	tableRef: RefObject<HTMLTableElement>;
}) {
	const table = useTableState();
	const loading = useTableLoadingState();

	const rows = useMemo(
		() => table.getRowModel().rows,
		[table.getRowModel().rows],
	);

	return (
		<>
			<thead>
				<LoadingIndicator tableRef={tableRef} />
			</thead>
			<DataTableBody loading={loading}>
				{rows.map((row) => (
					<TableRow key={row.id} row={row} />
				))}
			</DataTableBody>
		</>
	);
});
