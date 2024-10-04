import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";

export function ExpandCell(props: CellContext<ScorecardTableData, boolean>) {
	const data = props.getValue();

	if (!data) {
		return (
			<DataTableCell
				style={{ width: 48 }}
				key={props.cell.id}
				fixed
				left="0"
			/>
		);
	}

	return null;
}
