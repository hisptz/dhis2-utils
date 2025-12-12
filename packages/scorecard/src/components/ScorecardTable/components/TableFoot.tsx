import { DataTableFoot, DataTableRow } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { flexRender } from "@tanstack/react-table";
import { Fragment } from "react";
import { useScorecardViewStateValue } from "../../../utils/viewState";

export function TableFoot() {
	const table = useTableState();
	const showAverageRow = useScorecardViewStateValue<boolean>("averageRow");

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
