import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardTableCellData,
	ScorecardTableData,
} from "../../../schemas/config";
import { useAverage } from "../../../hooks/average";
import { LinkedCell } from "./LinkedCell";

export function LinkedDataFooterCell({
	table,
	column,
	header,
	dataSources,
}: HeaderContext<ScorecardTableData, ScorecardTableCellData> & {
	dataSources: ScorecardTableCellData["dataSources"];
}) {
	const [top, bottom] = dataSources ?? [];

	const { average: topAverage, legendDefinition: topLegendDefinition } =
		useAverage({
			dataSource: top,
			column,
			header,
			table,
		});
	const { average: bottomAverage, legendDefinition: bottomLegendDefinition } =
		useAverage({
			dataSource: bottom,
			column,
			header,
			table,
		});

	return (
		<LinkedCell
			top={{
				dataSource: top,
				legendDefinition: topLegendDefinition,
				value: topAverage,
			}}
			bottom={{
				dataSource: bottom,
				legendDefinition: topLegendDefinition,
				value: bottomAverage,
			}}
		/>
	);
}
