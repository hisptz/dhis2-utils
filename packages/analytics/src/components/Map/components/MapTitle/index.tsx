import "./style/mapTitle.css";
import { useMap } from "react-leaflet";
import { createPortal } from "react-dom";
import { Tag } from "@dhis2/ui";
import { useMapPeriodFilter, useMapPeriods } from "../MapProvider/hooks";

export const MapPeriodTitle = () => {
	const periodSelection = useMapPeriods();
	const { activePeriod } = useMapPeriodFilter();
	const map = useMap();
	const container = map.getContainer();

	const isTimeline = periodSelection?.renderingStrategy === "TIMELINE";
	const periods = periodSelection?.periods;

	let label: string | undefined;
	if (isTimeline && activePeriod) {
		label = periods?.find((pe) => pe.id === activePeriod)?.name ?? activePeriod;
	} else {
		label = periods?.map((pe) => pe.name).join(", ");
	}

	if (!label) return null;

	return createPortal(
		<div className="map-title-overlay">
			<Tag>{label}</Tag>
		</div>,
		container,
	);
};
