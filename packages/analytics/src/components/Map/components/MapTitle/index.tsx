import "./style/mapTitle.css";
import { useMap } from "react-leaflet";
import { createPortal } from "react-dom";
import { Tag } from "@dhis2/ui";
import { useMapPeriods } from "../MapProvider/hooks";

export const MapPeriodTitle = () => {
	const periodSelection = useMapPeriods();
	const map = useMap();
	const container = map.getContainer(); // the .leaflet-container div

	return createPortal(
		<div className="map-title-overlay">
			<Tag>
				{periodSelection?.periods?.map((pe) => pe.name).join(",")}
			</Tag>
		</div>,
		container,
	);
};
