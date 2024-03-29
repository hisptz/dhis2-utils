import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import React from "react";
import {
	GeoJSON,
	LayerGroup,
	LayersControl,
	Popup,
	Tooltip,
} from "react-leaflet";
import { MapOrgUnit } from "../../../../interfaces/index.js";
import { highlightFeature, resetHighlight } from "../../../../utils/map.js";
import { CustomBoundaryLayer as BoundaryLayerInterface } from "../../interfaces/index.js";
import { useBoundaryData } from "./hooks/useBoundaryData.js";

export const defaultStyle = {
	weight: 1,
	color: colors.grey900,
	fillColor: colors.grey900,
	fillOpacity: 0.0,
};
export const highlightStyle = {
	weight: 2,
	color: colors.grey900,
	dashArray: "",
	fillOpacity: 0.1,
};

export default function BoundaryLayer(props: BoundaryLayerInterface) {
	const { enabled, customEventHandlers, onLayerClick } = props ?? {};
	const orgUnits = useBoundaryData();

	return (
		<LayersControl.Overlay checked={enabled} name={i18n.t("Boundaries")}>
			<LayerGroup>
				{orgUnits?.map((area: MapOrgUnit) => {
					return (
						<GeoJSON
							data={area.geoJSON}
							interactive
							eventHandlers={{
								mouseover: (e) =>
									highlightFeature(e, highlightStyle),
								mouseout: (e) =>
									resetHighlight(e, defaultStyle),
								...(customEventHandlers ?? {}),
								mousedown: (e) => {
									if (onLayerClick) {
										onLayerClick(e, { orgUnit: area });
									}
								},
							}}
							key={`${area.id}-polygon`}
							pathOptions={defaultStyle}
						>
							<Tooltip>{area.name}</Tooltip>
							<Popup minWidth={80}>
								<h3>{area.name}</h3>
								<div>
									<b>Level: </b>
									{area.level}
								</div>
							</Popup>
						</GeoJSON>
					);
				})}
			</LayerGroup>
		</LayersControl.Overlay>
	);
}
