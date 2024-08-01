import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";

export function LabelCell(
	props: CellContext<ScorecardTableData, string | number>,
) {
	const data = props.getValue().toString();

	return (
		<DataTableCell
			style={{
				width: "fit-content",
				minWidth: 200,
			}}
			fixed
		>
			{data}
		</DataTableCell>
	);
}
