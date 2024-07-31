import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { DataTableCell, IconArrowDown24 } from "@dhis2/ui";

export function ExpandCell(props: CellContext<ScorecardTableData, boolean>) {
	const data = props.getValue();

	return (
		<DataTableCell fixed>{data ? <IconArrowDown24 /> : null}</DataTableCell>
	);
}
