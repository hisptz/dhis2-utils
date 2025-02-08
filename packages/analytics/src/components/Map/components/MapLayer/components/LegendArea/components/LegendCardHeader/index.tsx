import { IconLaunch16 } from "@dhis2/ui";
import React from "react";
import { truncate } from "lodash";

export default function LegendCardHeader({
	title,
	collapsible,
	onCollapse,
}: {
	title: string;
	onCollapse?: () => void;
	collapsible?: boolean;
}) {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				justifyContent: "space-between",
				alignItems: "center",
				padding: 8,
			}}
		>
			<h4 style={{ margin: 0 }} className="legend-header">
				{truncate(title, { length: 50, omission: "..." })}
			</h4>
			{collapsible && (
				<div onClick={onCollapse}>
					<IconLaunch16 />
				</div>
			)}
		</div>
	);
}
