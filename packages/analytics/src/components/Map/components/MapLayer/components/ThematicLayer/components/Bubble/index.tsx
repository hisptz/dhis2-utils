import { colors } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import {
	geoJSON,
	type LeafletEventHandlerFnMap,
	type LeafletMouseEvent,
} from "leaflet";
import { useMemo } from "react";
import { CircleMarker } from "react-leaflet";
import {
	getColorFromLegendSet,
	highlightFeature,
	resetHighlight,
} from "../../../../../../utils/map.js";
import {
	ThematicLayerData,
	ThematicLayerDataItem,
} from "../../../../interfaces/index.js";
import CustomTooltip from "../CustomTooltip/index.js";
import { MapOrgUnit } from "../../../../../../interfaces/index.js";

const defaultStyle = {
	weight: 1,
};
const highlightStyle = {
	weight: 2,
};

interface LayerData {
	orgUnit: MapOrgUnit;
	data?: number;
	dataItem: ThematicLayerDataItem;
}

export default function Bubble({
	data,
	highestData,
	legends,
	radius,
	customEventHandlers,
	onLayerClick,
}: {
	data: ThematicLayerData;
	highestData: number;
	legends: Legend[];
	radius?: { min: number; max: number };
	customEventHandlers?: LeafletEventHandlerFnMap;
	onLayerClick?: (e: LeafletMouseEvent, data: LayerData) => void;
}) {
	const { orgUnit, data: value } = data ?? {};

	const geoJSONObject = orgUnit.geoJSON;
	const center = geoJSON(geoJSONObject).getBounds().getCenter();

	const circleRadius = useMemo(() => {
		return ((value ?? 0) * (radius?.max ?? 50)) / highestData;
	}, [radius, data, highestData]);

	return (
		<>
			<CircleMarker
				interactive
				eventHandlers={{
					mouseover: (e) => highlightFeature(e, highlightStyle),
					mouseout: (e) => resetHighlight(e, defaultStyle),
					...(customEventHandlers ?? {}),
					mousedown: (e) => {
						if (onLayerClick) {
							onLayerClick(e, data);
						}
					},
				}}
				pathOptions={{
					fillColor: getColorFromLegendSet(legends, data.data),
					fillOpacity: 1,
					color: colors.grey900,
					weight: 1,
				}}
				radius={circleRadius}
				center={center}
			>
				<CustomTooltip data={data} />
			</CircleMarker>
		</>
	);
}
