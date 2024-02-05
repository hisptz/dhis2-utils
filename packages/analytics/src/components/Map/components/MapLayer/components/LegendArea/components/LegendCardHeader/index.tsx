import { IconLaunch16 } from "@dhis2/ui";
import React from "react";

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
				{title}
			</h4>
			{collapsible && (
				<div onClick={onCollapse}>
					<IconLaunch16 />
				</div>
			)}
		</div>
	);
}
