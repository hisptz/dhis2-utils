import type { ScorecardTableCellData } from "../../../schemas/config";
import type { ItemMeta } from "../../../hooks/metadata";
import { useCellData } from "../../../hooks/cellData";
import { colors, DataTableCell } from "@dhis2/ui";
import { DataValue } from "./DataValue";
import { useElementSize } from "usehooks-ts";
import { useMemo } from "react";
import { getTextColorFromBackgroundColor } from "../../../utils/legends";

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
	const [ref, { height, width }] = useElementSize();
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

	const angle = useMemo(() => {
		return Math.tan(height / width);
	}, [height, width]);

	return (
		<DataTableCell
			ref={ref}
			style={{
				padding: 8,
				minWidth: 120,
				background: `linear-gradient(-${angle}rad, ${
					bottomLegendDefinition?.color ?? colors.white
				} 0%, ${bottomLegendDefinition?.color ?? colors.white} 49%, ${
					colors.white
				} 49%, ${colors.white} 50%, ${
					topLegendDefinition?.color ?? colors.white
				} 50%, ${topLegendDefinition?.color ?? colors.white} 100%)`,
			}}
			bordered
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						background: "inherit",
						display: "flex",
						width: "100%",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						color: topLegendDefinition
							? getTextColorFromBackgroundColor(
									topLegendDefinition?.color ?? "#FFFFFF",
								)
							: undefined,
					}}
				>
					<DataValue dataSource={top} />
				</div>
				<div
					style={{
						background: "inherit",
						display: "flex",
						width: "100%",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						color: bottomLegendDefinition
							? getTextColorFromBackgroundColor(
									bottomLegendDefinition?.color ?? "#FFFFFF",
								)
							: undefined,
					}}
				>
					<DataValue dataSource={bottom} />
				</div>
			</div>
		</DataTableCell>
	);
}
