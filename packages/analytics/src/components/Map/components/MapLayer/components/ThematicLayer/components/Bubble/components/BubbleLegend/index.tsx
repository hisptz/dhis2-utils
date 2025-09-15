import { Divider } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import { forwardRef, type LegacyRef } from "react";
import {
	ThematicLayerData,
	ThematicLayerDataItem,
} from "../../../../../../interfaces/index.js";
import LegendCardHeader from "../../../../../LegendArea/components/LegendCardHeader/index.js";
import Bubbles from "./components/Bubbles.js";

function BubbleLegend(
	{
		radius,
		dataItem,
		data,
		name,
		collapsible,
		onCollapse,
		legends,
	}: {
		radius: { min: number; max: number };
		dataItem: ThematicLayerDataItem;
		data: ThematicLayerData[];
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
				onCollapse={onCollapse}
				collapsible={collapsible}
			/>
			<Divider margin={"0"} />
			<div className="legend-list pt-8">
				<Bubbles
					classes={legends.reverse()}
					radiusHigh={radius.max}
					radiusLow={radius.min}
					color={"#FF0000"}
				/>
			</div>
		</div>
	);
}

export default forwardRef(BubbleLegend);
