import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import { memo } from "react";

function NumberCellComponent(
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

export const NumberCell = memo(NumberCellComponent);
