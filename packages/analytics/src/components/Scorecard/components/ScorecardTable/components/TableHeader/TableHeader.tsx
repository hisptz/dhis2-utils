import { useTableState } from "../../../TableStateProvider";
import { DataTableHead, DataTableRow } from "@dhis2/ui";
import { flexRender } from "@tanstack/react-table";

export function TableHeader() {
	const table = useTableState();

	return (
		<DataTableHead>
			{table.getHeaderGroups().map((headerGroup) => (
				<DataTableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) =>
						flexRender(
							header.column.columnDef.header,
							header.getContext(),
						),
					)}
				</DataTableRow>
			))}
		</DataTableHead>
	);
}
