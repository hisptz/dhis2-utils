import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ControlPosition } from "leaflet";
import TimeSliderLeafletControl from "../utils/TimeSliderLeafletControl";
import TimeSliderLayer from ".";

export default function TimeSliderControlWrapper({
	position,
	slideInterval = 2000, // Default to 1000ms (1 second) if not provided
}: {
	position: ControlPosition;
	slideInterval?: number; // Optional prop for slide interval
}) {
	const [container, setContainer] = useState<HTMLElement | null>(null);

	useEffect(() => {
		// Delay so the control mounts first
		setTimeout(() => {
			const controls = document.getElementsByClassName(
				"leaflet-control-timeslider",
			);
			if (controls.length > 0) {
				setContainer(controls[0] as HTMLElement);
			}
		}, 0);
	}, []);

	return (
		<>
			<TimeSliderLeafletControl position={position} />
			{container && ReactDOM.createPortal(<TimeSliderLayer slideInterval={slideInterval}/>, container)}
		</>
	);
}
