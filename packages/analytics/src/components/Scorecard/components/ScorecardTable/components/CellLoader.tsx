import { CircularLoader, DataTableCell } from "@dhis2/ui";

export function CellLoader() {
	return (
		<DataTableCell align="center" bordered>
			<CircularLoader extrasmall />
		</DataTableCell>
	);
}
