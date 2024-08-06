import { DataTableBody } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { TableRow } from "./DataRow";

export function TableBody() {
	const table = useTableState();
	return (
		<DataTableBody>
			{table.getRowModel().rows.map((row) => (
				<TableRow key={row.id} row={row} />
			))}
		</DataTableBody>
	);
}
