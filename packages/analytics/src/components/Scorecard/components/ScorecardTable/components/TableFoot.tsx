import { DataTableFoot, DataTableRow } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { flexRender } from "@tanstack/react-table";
import { useScorecardStateSelector } from "../../StateProvider";
import { Fragment } from "react";

export function TableFoot() {
	const table = useTableState();
	const showAverageRow = useScorecardStateSelector<boolean>([
		"options",
		"averageRow",
	]);

	if (!showAverageRow) {
		return null;
	}

	return (
		<DataTableFoot>
			{table.getFooterGroups().map((footerGroup) => {
				return (
					<DataTableRow key={footerGroup.id}>
						{footerGroup.headers.map((footer) => {
							return footer.isPlaceholder ? null : (
								<Fragment key={footer.id}>
									{flexRender(
										footer.column.columnDef.footer,
										footer.getContext(),
									)}
								</Fragment>
							);
						})}
					</DataTableRow>
				);
			})}
		</DataTableFoot>
	);
}
