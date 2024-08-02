import { DataTableFoot, DataTableRow } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { flexRender } from "@tanstack/react-table";
import { useScorecardState } from "../../StateProvider";

export function TableFoot() {
	const table = useTableState();
	const state = useScorecardState();

	const hideAverage = !state?.options.averageRow;

	if (hideAverage) {
		return null;
	}

	return (
		<DataTableFoot>
			{table.getFooterGroups().map((footerGroup) => {
				return (
					<DataTableRow key={footerGroup.id}>
						{footerGroup.headers.map((footer) => {
							return footer.isPlaceholder
								? null
								: flexRender(
										footer.column.columnDef.footer,
										footer.getContext(),
									);
						})}
					</DataTableRow>
				);
			})}
		</DataTableFoot>
	);
}
