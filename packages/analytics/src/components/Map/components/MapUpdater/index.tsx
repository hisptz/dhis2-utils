import { useCenterMap } from "../../hooks/map.js";
import { type RefObject } from "react";
import { LatLngTuple } from "leaflet";

export default function MapUpdater({
	bounds,
	containerRef,
}: {
	bounds: LatLngTuple[];
	containerRef: RefObject<HTMLDivElement>;
}) {
	useCenterMap({ bounds, containerRef });
	return null;
}
