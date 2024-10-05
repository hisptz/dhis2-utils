import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";

export function ExpandCell(props: CellContext<ScorecardTableData, boolean>) {
	const data = props.getValue();

	if (!data) {
		return (
			<DataTableCell
				width={"48px"}
				style={{ width: 48, maxWidth: 48, minWidth: 48 }}
				key={props.cell.id}
				fixed
				/*
      // @ts-ignore */
				left="0"
			/>
		);
	}

	return null;
}
