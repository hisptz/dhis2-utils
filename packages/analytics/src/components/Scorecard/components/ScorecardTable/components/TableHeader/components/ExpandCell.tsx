import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell, IconArrowDown24 } from "@dhis2/ui";
import { uid } from "@hisptz/dhis2-utils/src";

export function ExpandCell(props: CellContext<ScorecardTableData, boolean>) {
	const data = props.getValue();

	return (
		<DataTableCell key={uid()} fixed>
			{data ? <IconArrowDown24 key={uid()} /> : null}
		</DataTableCell>
	);
}
