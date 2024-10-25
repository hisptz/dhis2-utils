import { geoJSON, LatLngTuple } from "leaflet";
import { type RefObject, useMemo } from "react";
import { useMapOrganisationUnit } from "../components/MapProvider/hooks";
import { useMediaQuery, useResizeObserver } from "usehooks-ts";
import { isEmpty } from "lodash";
import { useMap } from "react-leaflet";

export function useMapBounds() {
	const { orgUnits } = useMapOrganisationUnit();
	const geoJSONObject = useMemo(
		() =>
			geoJSON({
				type: "FeatureCollection",
				features: orgUnits?.map((orgUnit) => orgUnit.geoJSON),
			} as any),
		[orgUnits],
	);

	const center = useMemo(() => {
		return geoJSONObject.getBounds().getCenter();
	}, [orgUnits]);
	const bounds: any = useMemo(() => {
		return geoJSONObject.getBounds();
	}, [orgUnits]);

	return {
		center,
		bounds,
	};
}

export function useCenterMap({
	bounds,
	containerRef,
}: {
	bounds: LatLngTuple[];
	containerRef: RefObject<HTMLDivElement>;
}) {
	const map = useMap();
	useResizeObserver({
		ref: containerRef,
		onResize: () => {
			if (!isEmpty(bounds)) {
				map.fitBounds(bounds);
			}
		},
	});
}

export function usePrintMedia() {
	return useMediaQuery("@media print");
}
