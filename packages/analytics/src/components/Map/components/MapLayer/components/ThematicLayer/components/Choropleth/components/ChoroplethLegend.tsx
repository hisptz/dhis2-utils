import "../../../styles/legends.css";
import { colors, Divider } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import { forwardRef, type LegacyRef } from "react";
import { getLegendCount } from "../../../../../../../utils";
import {
	ThematicLayerData,
	ThematicLayerDataItem,
} from "../../../../../interfaces";
import LegendCardHeader from "../../../../LegendArea/components/LegendCardHeader/index.js";
import { sortBy } from "lodash";

const formatNumber = Intl.NumberFormat("en-GB", {
	notation: "standard",
}).format;

export function LegendItem({
	legend,
	value,
}: {
	legend: {
		startValue: number;
		endValue: number;
		color: string;
		name?: string;
	};
	value: number;
}) {
	if (legend.name) {
		return (
			<div
				style={{
					display: "flex",
					gap: 8,
					alignItems: "stretch",
					width: "100%",
				}}
			>
				<div
					style={{
						alignSelf: "stretch",
						backgroundColor: legend.color,
						width: 8,
						minHeight: "100%",
					}}
				></div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<span>{legend.name}</span>
					<div
						style={{
							display: "flex",
							gap: 4,
							fontSize: 11,
							color: colors.grey600,
						}}
					>
						<div className="legend-item-label">{`${formatNumber(legend.startValue ?? 1)} - ${formatNumber(legend.endValue ?? 1)}`}</div>
						<div className="legend-item-value">{`(${formatNumber(value ?? 0)})`}</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="legend-item">
			<div
				className="legend-item-color"
				style={{ backgroundColor: legend.color }}
			/>
			<div className="legend-item-label">{`${formatNumber(legend.startValue ?? 1)} - ${formatNumber(legend.endValue ?? 1)}`}</div>
			<div className="legend-item-value">{`(${formatNumber(value ?? 0)})`}</div>
		</div>
	);
}

function ChoroplethLegend(
	{
		dataItem,
		data,
		collapsible,
		onCollapse,
		legends,
	}: {
		data: ThematicLayerData[];
		dataItem: ThematicLayerDataItem;
		name?: string;
		collapsible?: boolean;
		onCollapse?: () => void;
		legends: Legend[];
	},
	ref: LegacyRef<HTMLDivElement> | undefined,
) {
	return (
		<div className="legend-card" ref={ref}>
			<LegendCardHeader
				title={dataItem.displayName}
				collapsible={collapsible}
				onCollapse={onCollapse}
			/>
			<Divider margin={"0"} />
			<div style={{ paddingTop: 4 }} className="legend-list">
				{sortBy(legends, "startValue").map((legend) => (
					<LegendItem
						key={`${legend?.color}-legend-list`}
						legend={legend}
						value={getLegendCount(legend, data)}
					/>
				))}
			</div>
		</div>
	);
}

export default forwardRef(ChoroplethLegend);
