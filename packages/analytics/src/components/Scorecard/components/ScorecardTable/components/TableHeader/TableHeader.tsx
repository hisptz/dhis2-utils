import { useTableState } from "../../../TableStateProvider";
import { DataTableHead, DataTableRow } from "@dhis2/ui";
import { flexRender } from "@tanstack/react-table";
import { Fragment, memo } from "react";

export const TableHeader = memo(function TableHeaderComponent() {
	const table = useTableState();

	return (
		<DataTableHead>
			{table.getHeaderGroups().map((headerGroup) => (
				<DataTableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<Fragment key={`${header.id}-fragment`}>
							{flexRender(
								header.column.columnDef.header,
								header.getContext(),
							)}
						</Fragment>
					))}
				</DataTableRow>
			))}
		</DataTableHead>
	);
});
