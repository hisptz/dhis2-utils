import { DataTableBody, DataTableRow } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { flexRender } from "@tanstack/react-table";

export function TableBody() {
	const table = useTableState();
	return (
		<DataTableBody>
			{table.getRowModel().rows.map((row) => {
				return (
					<DataTableRow key={row.id}>
						{row.getVisibleCells().map((cell) => {
							const column = cell.column.columnDef.meta;
							return flexRender(
								cell.column.columnDef.cell,
								cell.getContext(),
							);
						})}
					</DataTableRow>
				);
			})}
		</DataTableBody>
	);
}
