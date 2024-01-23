import { Map as LeafletMap } from "leaflet";
import React, { forwardRef } from "react";
import MapArea from "./components/MapArea/index.js";
import {
	CustomBoundaryLayer,
	CustomPointLayer,
} from "./components/MapLayer/interfaces";
import { MapProvider } from "./components/MapProvider/index.js";
import { MapProps } from "./interfaces/index.js";
import "leaflet/dist/leaflet.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MapComponent = (
	{
		orgUnitSelection,
		pointLayer,
		boundaryLayer,
		thematicLayers,
		earthEngineLayers,
		periodSelection,
		mapOptions,
		key,
		controls,
		legends,
	}: MapProps,
	ref: React.Ref<LeafletMap> | undefined,
) => {
	const sanitizedPointLayers: CustomPointLayer[] = [
		{
			type: "point",
			id: "point",
			enabled: pointLayer?.enabled ?? false,
			...pointLayer,
		},
	];
	const sanitizedBoundaryLayers: CustomBoundaryLayer[] = [
		{
			type: "overlay",
			id: "boundary",
			enabled: boundaryLayer?.enabled ?? false,
		},
	];

	return (
		<QueryClientProvider client={queryClient}>
			<MapProvider
				periodSelection={periodSelection}
				orgUnitSelection={orgUnitSelection}
			>
				<MapArea
					layers={{
						thematicLayers,
						earthEngineLayers,
						boundaryLayers: sanitizedBoundaryLayers,
						pointLayers: sanitizedPointLayers,
					}}
					legends={legends}
					controls={controls}
					key={key}
					ref={ref}
					mapOptions={mapOptions}
				/>
			</MapProvider>
		</QueryClientProvider>
	);
};
export const DHIS2Map: React.FC<MapProps> = forwardRef(MapComponent);

/**
 * @deprecated since `v2`. Use `DHIS2Map` instead
 * */
export const Map = DHIS2Map;
