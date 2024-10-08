import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";

export function EmptyFooterCell(
	props: HeaderContext<ScorecardTableData, unknown>,
) {
	return <DataTableCell bordered />;
}
