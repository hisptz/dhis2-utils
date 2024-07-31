import { useTableState } from "../../../TableStateProvider";
import { DataTableColumnHeader, DataTableHead, DataTableRow } from "@dhis2/ui";
import { flexRender } from "@tanstack/react-table";

export function TableHeader() {
	const table = useTableState();

	return (
		<DataTableHead>
			{table.getHeaderGroups().map((headerGroup) => (
				<DataTableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<DataTableColumnHeader
							colSpan={header.colSpan.toString()}
							key={`${header.id}-${header.index}`}
						>
							{header.isPlaceholder
								? null
								: flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
						</DataTableColumnHeader>
					))}
				</DataTableRow>
			))}
		</DataTableHead>
	);
}
