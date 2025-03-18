import { uid } from "@hisptz/dhis2-utils";
import { Map as LeafletMap } from "leaflet";
import { isEmpty } from "lodash";
import React, { forwardRef, useRef } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMapBounds } from "../../hooks/map.js";
import MapControl from "../MapControls/index.js";
import MapLayer from "../MapLayer/index.js";
import LegendArea from "../MapLayer/components/LegendArea/index.js";
import { CustomThematicLayer } from "../MapLayer/interfaces/index.js";
import { MapLayersProvider } from "../MapProvider/components/MapLayerProvider/index.js";
import { useMapLayers } from "../MapProvider/hooks/index.js";
import {
	MapAreaProps,
	MapControls,
	MapLegendConfig,
} from "./interfaces/index.js";
import MapUpdater from "../MapUpdater/index.js";

function MapLayerArea({
	id,
	base = { enabled: true },
	controls,
	legends,
}: {
	id: string;
	base?: {
		url?: string;
		attribution?: string;
		enabled?: boolean;
	};
	controls?: MapControls[];
	legends?: MapLegendConfig;
}) {
	const { layers } = useMapLayers();

	return (
		<>
			{!base?.enabled && (
				<TileLayer
					id={id}
					attribution={
						base?.attribution ??
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://carto.com/attribution">CARTO</a>'
					}
					url={
						base?.url ??
						"https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
					}
				/>
			)}
			{controls?.map((control) => (
				<MapControl
					mapId={id}
					key={`${control.type}-control`}
					{...control}
				/>
			))}
			{!isEmpty(layers) && (
				<LayersControl hideSingleBase position={"topleft"}>
					{(layers as CustomThematicLayer[]).map(
						(layer: CustomThematicLayer, index) => (
							<MapLayer
								key={layer.id}
								layer={layer}
								index={index}
							/>
						),
					)}
				</LayersControl>
			)}
			{!isEmpty(layers) && (
				<LegendArea
					legends={legends}
					layers={layers as CustomThematicLayer[]}
					position={"topright"}
				/>
			)}
		</>
	);
}

const MapArea = (
	{
		base,
		controls,
		mapOptions,
		key,
		legends,
		layers,
		analyticsOptions,
	}: MapAreaProps,
	ref: React.Ref<LeafletMap> | undefined,
) => {
	const { center, bounds } = useMapBounds();
	const { current: id } = useRef<string>(uid());
	const containerRef = useRef<HTMLDivElement | null>(null);

	return (
		<div
			ref={containerRef}
			id={`${id}-"map-container`}
			style={{ height: "100%", width: "100%" }}
		>
			<MapContainer
				attributionControl
				ref={ref}
				id={id}
				center={center}
				bounceAtZoomLimits
				bounds={bounds}
				style={{ height: "100%", width: "100%", minHeight: 500 }}
				key={key}
				trackResize
				{...mapOptions}
			>
				<MapUpdater containerRef={containerRef} bounds={bounds} />
				<MapLayersProvider
					analyticsOptions={analyticsOptions}
					layers={layers}
				>
					<MapLayerArea
						base={base}
						id={id}
						controls={controls}
						legends={legends}
					/>
				</MapLayersProvider>
			</MapContainer>
		</div>
	);
};

export default forwardRef(MapArea);
