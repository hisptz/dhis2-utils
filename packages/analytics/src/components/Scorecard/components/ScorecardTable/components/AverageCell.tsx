import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";

export function AverageCell(props: CellContext<ScorecardTableData, number>) {
	const value = props.getValue();

	return (
		<DataTableCell align="center" key={props.row.id}>
			<b>{value}</b>
		</DataTableCell>
	);
}
