import { DataTableCell } from "@dhis2/ui";

export function CellLoader({ size }: { size: number }) {
	return <DataTableCell style={{ width: size }} align="center" bordered />;
}
