import React from "react";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { MapControls } from "../MapArea/interfaces/index.js";
import FullscreenControl from "./components/FullscreenControl/index.js";
import DownloadControl from "./components/DownloadControl/index.js";
import { TimelineControl } from "./components/TimelineControl/index.js";

export type MapControlProps = Extract<MapControls, { type: string }> & { mapId: string };

export default function MapControl(props: MapControls & { mapId: string }) {
	const { type } = props;
	switch (type) {
		case "zoom":
			return <ZoomControl position={props.position} {...props.options} />;
		case "scale":
			return <ScaleControl position={props.position} {...props.options} />;
		case "fullscreen":
			return <FullscreenControl position={props.position} {...props.options} />;
		case "print":
			return (
				<DownloadControl
					mapId={props.mapId}
					options={props.options}
					position={props.position}
				/>
			);
		case "timeline":
			return <TimelineControl {...props} />;
		default:
			return null;
	}
}
