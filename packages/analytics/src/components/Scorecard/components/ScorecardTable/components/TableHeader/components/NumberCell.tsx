import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";

export function NumberCell(
	props: CellContext<ScorecardTableData, string | number>,
) {
	const data = props.getValue().toString();

	return (
		<DataTableCell
			style={{
				width: "fit-content",
			}}
			fixed
		>
			{data}
		</DataTableCell>
	);
}
