import { colors } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import React from "react";
import { GeoJSON } from "react-leaflet";
import { MapOrgUnit } from "../../../../../../interfaces";
import {
	getColorFromLegendSet,
	highlightFeature,
	resetHighlight,
} from "../../../../../../utils";
import {
	type LayerLabelConfig,
	ThematicLayerDataItem,
} from "../../../../interfaces";
import CustomTooltip from "../CustomTooltip/index.js";
import { type LeafletEventHandlerFnMap, type LeafletMouseEvent } from "leaflet";
import { LabelMarker } from "../LabelMarker";
import { getCenter } from "geolib";
import { chunk, flattenDeep } from "lodash";

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
	labelConfig,
}: {
	data: LayerData;
	legends: Legend[];
	customEventHandlers?: LeafletEventHandlerFnMap;
	onLayerClick?: (e: LeafletMouseEvent, data: LayerData) => void;
	labelConfig?: LayerLabelConfig;
}) {
	const { orgUnit } = data;

	const color = getColorFromLegendSet(legends, data.data);

	const center = getCenter(
		chunk<number>(
			flattenDeep<number>(orgUnit.geoJSON.geometry.coordinates),
			2,
		).map(([latitude, longitude]: number[]) => ({
			longitude,
			latitude,
		})),
	) as {
		longitude: number;
		latitude: number;
	};

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
				interactive
				pathOptions={{
					fillColor: color,
					fillOpacity: 1,
					color: colors.grey900,
					fill: true,
					weight: 1,
				}}
				key={`${data.dataItem.id}-layer`}
			>
				{labelConfig && (
					<LabelMarker
						layerColor={color}
						labelConfig={labelConfig}
						data={data.data}
						orgUnit={orgUnit}
						center={[center.longitude, center.latitude]}
					/>
				)}
				<CustomTooltip data={data} />
			</GeoJSON>
		</>
	);
}
