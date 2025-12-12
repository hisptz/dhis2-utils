import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";

export function ExpandCell(props: CellContext<ScorecardTableData, boolean>) {
	const data = props.getValue();
	const size = props.cell.column.getSize();

	if (!data) {
		return (
			<DataTableCell
				width={`${size}px`}
				style={{ width: size, minWidth: size }}
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
