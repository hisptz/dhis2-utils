import { colors, DataTableCell } from "@dhis2/ui";
import { getTextColorFromBackgroundColor } from "../../../utils/legends";
import { DataValue } from "./DataValue";
import { useElementSize } from "usehooks-ts";
import React, { useMemo } from "react";
import type {
	LegendDefinition,
	ScorecardTableCellData,
} from "../../../schemas/config";

export interface LinkedCellProps {
	top: {
		dataSource: ScorecardTableCellData["dataSources"][number];
		legendDefinition?: LegendDefinition;
		value?: number;
	};
	bottom: {
		dataSource: ScorecardTableCellData["dataSources"][number];
		legendDefinition?: LegendDefinition;
		value?: number;
	};

	[key: string]: unknown;
}

export function LinkedCell({ top, bottom, ...props }: LinkedCellProps) {
	const [ref, { height, width }] = useElementSize();

	const {
		legendDefinition: topLegendDefinition,
		dataSource: topDataSource,
		value: topValue,
	} = top;
	const {
		legendDefinition: bottomLegendDefinition,
		dataSource: bottomDataSource,
		value: bottomValue,
	} = bottom;

	const angle = useMemo(() => {
		return Math.tan(height / width);
	}, [height, width]);

	return (
		<DataTableCell
			{...props}
			/*
      // @ts-ignore */
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
					<DataValue value={topValue} dataSource={topDataSource} />
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
					<DataValue
						value={bottomValue}
						dataSource={bottomDataSource}
					/>
				</div>
			</div>
		</DataTableCell>
	);
}
