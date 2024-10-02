import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { getTextColorFromBackgroundColor } from "../../../utils/legends";
import { useAverage } from "../../../hooks/average";

export function SingleDataFooterCell({
	dataSource,
	table,
	column,
	header,
}: HeaderContext<ScorecardTableData, ScorecardTableCellConfig> & {
	dataSource: ScorecardTableCellConfig["dataSources"][number];
}) {
	const { legendDefinition, average } = useAverage({
		dataSource,
		table,
		column,
		header,
	});

	return (
		<DataTableCell
			bordered
			style={{
				background: legendDefinition?.color,
				textAlign: "center",
				minWidth: 100,
				color: legendDefinition
					? getTextColorFromBackgroundColor(legendDefinition?.color)
					: undefined,
			}}
			align="center"
		>
			<b>{average}</b>
		</DataTableCell>
	);
}
