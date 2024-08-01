import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { DataTableColumnHeader } from "@dhis2/ui";
import { useScorecardState } from "../../StateProvider";

export function MetaHeaderCell({
	column,
	header,
	table,
}: HeaderContext<ScorecardTableData, any>) {
	const state = useScorecardState();
	const hasOnePeriod = state?.periodSelection?.periods.length === 1;
	const dataInRows = state?.options?.showDataInRows ?? false;

	const rowSpan = dataInRows ? (hasOnePeriod ? "1" : "2") : "3";

	return (
		<DataTableColumnHeader
			colSpan={header.colSpan.toString()}
			rowSpan={rowSpan}
		></DataTableColumnHeader>
	);
}
