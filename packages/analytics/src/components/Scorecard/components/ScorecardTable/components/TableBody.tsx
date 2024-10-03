import { DataTableBody } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { TableRow } from "./DataRow";
import { LoadingIndicator } from "../../LoadingIndicator";
import { memo } from "react";

export const TableBody = memo(function TableBody() {
	const table = useTableState();
	return (
		<DataTableBody>
			<LoadingIndicator />
			{table.getRowModel().rows.map((row) => (
				<TableRow key={row.id} row={row} />
			))}
		</DataTableBody>
	);
});
