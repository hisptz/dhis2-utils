import { useConfig } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import L from "leaflet";
import React from "react";
import {
	GeoJSON,
	LayerGroup,
	LayersControl,
	Popup,
	Tooltip,
} from "react-leaflet";
import { PointOrgUnit } from "../../../../interfaces/index.js";
import { getIcon, getIconUrl } from "../../../../utils/helpers.js";
import { usePointLayer } from "./hooks/index.js";

export function PointLayer() {
	const pointLayer = usePointLayer();
	const {
		enabled,
		label,
		points: orgUnits,
		style,
		customEventHandlers,
		onLayerClick,
	} = pointLayer ?? {};
	const { baseUrl } = useConfig();
	return (
		<LayersControl.Overlay
			checked={enabled}
			name={label ?? i18n.t("Points")}
		>
			<LayerGroup>
				{orgUnits?.map((area: PointOrgUnit) => {
					return (
						<GeoJSON
							pointToLayer={(_, coordinates) => {
								return L.marker(coordinates, {
									icon: getIcon(
										getIconUrl(
											area.icon.icon ?? style?.icon,
											{ baseUrl },
										),
									),
								});
							}}
							eventHandlers={{
								...(customEventHandlers ?? {}),
								mousedown: (e) => {
									if (onLayerClick) {
										onLayerClick(e, { orgUnit: area });
									}
								},
							}}
							data={area.geoJSON}
							interactive
							key={`${area.id}-polygon`}
						>
							<Tooltip>{area.name}</Tooltip>
							<Popup minWidth={80}>
								<h3>{area.name}</h3>
							</Popup>
						</GeoJSON>
					);
				})}
			</LayerGroup>
		</LayersControl.Overlay>
	);
}
