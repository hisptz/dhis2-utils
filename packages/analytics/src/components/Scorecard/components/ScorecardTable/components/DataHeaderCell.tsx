import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { DataTableColumnHeader } from "@dhis2/ui";

export function DataHeaderCell({
	column,
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const label =
		(header.column.columnDef.meta as { label: string }).label ??
		(column.columnDef.meta as { label: string }).label;

	const colSpan = header.colSpan.toString();

	return (
		<DataTableColumnHeader colSpan={colSpan}>{label}</DataTableColumnHeader>
	);
}
