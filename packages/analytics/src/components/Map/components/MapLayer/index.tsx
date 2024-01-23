import React from "react";
import BoundaryLayer from "./components/BoundaryLayer/index.js";
import GoogleEngineLayer from "./components/GoogleEngineLayer/index.js";
import { PointLayer } from "./components/PointLayer/index.js";
import ThematicLayer from "./components/ThematicLayer/index.js";
import {
	CustomBoundaryLayer,
	CustomGoogleEngineLayer,
	CustomPointLayer,
	CustomThematicLayer,
} from "./interfaces/index.js";

export default function MapLayer({
	layer,
	index,
}: {
	layer:
		| CustomThematicLayer
		| CustomBoundaryLayer
		| CustomPointLayer
		| CustomGoogleEngineLayer;
	index: number;
}) {
	switch (layer.type) {
		case "overlay":
		case "basemap":
			return <BoundaryLayer {...layer} />;
		case "bubble":
		case "choropleth":
			return <ThematicLayer layerId={layer.id} index={index} />;
		case "point":
			return <PointLayer />;
		case "population":
		case "elevation":
		case "footprints":
		case "landCover":
			return <GoogleEngineLayer layerId={layer.id} />;
		default:
			return null;
	}
}
