import type { ScorecardTableCellData } from "../../../schemas/config";
import type { ItemMeta } from "../../../hooks/metadata";
import { useCellData } from "../../../hooks/cellData";
import { LinkedCell } from "./LinkedCell";

export interface LinkedDataCellProps {
	dataSources: ScorecardTableCellData["dataSources"];
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}

export function LinkedDataCell({
	dataSources,
	orgUnit,
	period,
}: LinkedDataCellProps) {
	const [top, bottom] = dataSources ?? [];
	const { legendDefinition: topLegendDefinition } = useCellData({
		dataSource: top,
		orgUnit,
		period,
	});
	const { legendDefinition: bottomLegendDefinition } = useCellData({
		dataSource: bottom,
		orgUnit,
		period,
	});

	return (
		<LinkedCell
			top={{
				legendDefinition: topLegendDefinition,
				dataSource: top,
			}}
			bottom={{
				legendDefinition: bottomLegendDefinition,
				dataSource: bottom,
			}}
		/>
	);
}
