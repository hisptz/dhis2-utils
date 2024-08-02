import { type ScorecardTableCellData } from "../../../schemas/config";
import { type ItemMeta } from "../../../hooks/metadata";
import { type ReactNode } from "react";
import { head } from "lodash";
import { DataTableCell } from "@dhis2/ui";
import { getTextColorFromBackgroundColor } from "../../../utils/legends";
import { DataValue } from "./DataValue";
import { useCellData } from "../../../hooks/cellData";

export interface SingleDataCellProps {
	dataSources: ScorecardTableCellData["dataSources"];
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}

export function SingleDataCell({
	dataSources,
	period,
	orgUnit,
}: SingleDataCellProps): ReactNode {
	const dataSource = head(dataSources);
	const { legendDefinition } = useCellData({
		dataSource,
		period,
		orgUnit,
	});

	if (!dataSource) {
		return <DataTableCell bordered />;
	}

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
		>
			<DataValue dataSource={dataSource} />
		</DataTableCell>
	);
}
