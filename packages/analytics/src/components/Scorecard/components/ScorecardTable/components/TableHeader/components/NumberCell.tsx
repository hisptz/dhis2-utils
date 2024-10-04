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
				width: 48,
				minWidth: 48,
				maxWidth: 48,
			}}
			fixed
			/*
      // @ts-ignore */
			left="48px"
		>
			{data}
		</DataTableCell>
	);
}

export const NumberCell = memo(NumberCellComponent);
