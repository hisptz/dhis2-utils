import { colors, IconLaunch16, Tooltip } from "@dhis2/ui";
import React from "react";
import { truncate } from "lodash";
import { useMapPeriods } from "../../../../../MapProvider/hooks";

export default function LegendCardHeader({
	title,
	collapsible,
	onCollapse,
}: {
	title: string;
	onCollapse?: () => void;
	collapsible?: boolean;
}) {
	const { periods } = useMapPeriods() ?? {};
	const periodLabel = periods?.map((period) => period.name).join(", ");
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				width: "100%",
				padding: 4,
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 8,
				}}
			>
				<h4 style={{ margin: 0 }} className="legend-header">
					<Tooltip content={title}>
						{truncate(title, { length: 20, omission: "..." })}
					</Tooltip>
				</h4>
				{collapsible && (
					<div onClick={onCollapse}>
						<IconLaunch16 />
					</div>
				)}
			</div>
			{periodLabel && (
				<Tooltip content={periodLabel}>
					<span style={{ color: colors.grey700 }}>
						{truncate(periodLabel, { length: 20, omission: "..." })}
					</span>
				</Tooltip>
			)}
		</div>
	);
}
