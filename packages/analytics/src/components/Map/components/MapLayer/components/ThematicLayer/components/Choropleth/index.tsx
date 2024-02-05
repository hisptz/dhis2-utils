import { colors } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import React from "react";
import { GeoJSON } from "react-leaflet";
import { MapOrgUnit } from "../../../../../../interfaces/index.js";
import {
	getColorFromLegendSet,
	highlightFeature,
	resetHighlight,
} from "../../../../../../utils/map.js";
import { ThematicLayerDataItem } from "../../../../interfaces/index.js";
import CustomTooltip from "../CustomTooltip/index.js";
import type { LeafletEventHandlerFnMap, LeafletMouseEvent } from "leaflet";

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

export default function Choropleth({
	data,
	legends,
	customEventHandlers,
	onLayerClick,
}: {
	data: LayerData;
	legends: Legend[];
	customEventHandlers?: LeafletEventHandlerFnMap;
	onLayerClick?: (e: LeafletMouseEvent, data: LayerData) => void;
}) {
	const { orgUnit } = data;
	return (
		<>
			<GeoJSON
				data={orgUnit.geoJSON}
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
				key={`${data.dataItem.id}-layer`}
			>
				<CustomTooltip data={data} />
			</GeoJSON>
		</>
	);
}
