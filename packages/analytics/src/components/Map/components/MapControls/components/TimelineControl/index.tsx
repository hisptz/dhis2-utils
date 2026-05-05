import { control } from "leaflet";
import "leaflet.timeline.control";
import "leaflet.timeline.control/build/style.css";
import { DurationObjectUnits } from "luxon";
import { useContext, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { MapPeriodFilterContext } from "../../../../state/index.js";
import { dateToDHIS2PeriodId, type DHIS2PeriodType } from "../../../../utils/helpers.js";

export type { DHIS2PeriodType };

export type TimelineRange =
	| { range: [Date, Date]; step: DurationObjectUnits }
	| { range: [Date, Date, ...Date[]] };

export type TimelinePosition =
	| "bottomleft"
	| "bottomright"
	| "bottomcenter"
	| "topleft"
	| "topright"
	| "topcenter";

export interface TimelineControlOptions {
	position?: TimelinePosition;
	autoplay?: boolean;
	interval?: number;
	/** DHIS2 period type — overrides the auto-detected type from the analytics response when set */
	periodType?: DHIS2PeriodType;
	button?: {
		pausedText?: string;
		playingText?: string;
	};
	timeline: {
		dateFormat: string;
	} & TimelineRange;
}

// Leaflet only supports corner positions — map center variants to the nearest corner
// then shift the container to the centre via CSS after mounting.
function toLeafletPosition(pos: TimelinePosition): "bottomleft" | "bottomright" | "topleft" | "topright" {
	if (pos === "bottomcenter") return "bottomleft";
	if (pos === "topcenter") return "topleft";
	return pos;
}

function applyCenterStyle(
	timelineControl: { getContainer?: () => HTMLElement | undefined },
	position: TimelinePosition,
): void {
	if (position !== "bottomcenter" && position !== "topcenter") return;
	const container = timelineControl.getContainer?.();
	if (!container) return;
	// Move the control out of the corner float flow and centre it horizontally
	Object.assign(container.style, {
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%)",
		float: "none",
	});
}

export function TimelineControl({
	position = "bottomleft",
	autoplay = false,
	interval = 1000,
	periodType,
	button,
	timeline,
}: TimelineControlOptions) {
	const map = useMap();
	const { setActivePeriod, setPeriodType, periodType: contextPeriodType } = useContext(MapPeriodFilterContext);
	const controlRef = useRef<any>(null);

	// Only override the auto-detected period type when one is explicitly provided
	useEffect(() => {
		if (periodType) setPeriodType(periodType);
	}, [periodType]);

	const resolvedPeriodType = periodType ?? contextPeriodType ?? "Monthly";

	useEffect(() => {
		const timelineControl = (control as any).timeline({
			position: toLeafletPosition(position),
			autoplay,
			interval,
			button: {
				pausedText: button?.pausedText ?? "Play",
				playingText: button?.playingText ?? "Pause",
			},
			timeline,
			onNextStep: (current: Date) => {
				setActivePeriod(dateToDHIS2PeriodId(current, resolvedPeriodType));
			},
		});

		timelineControl.addTo(map);
		applyCenterStyle(timelineControl as { getContainer?: () => HTMLElement | undefined }, position);
		controlRef.current = timelineControl;

		return () => {
			timelineControl.remove();
		};
	}, [map, autoplay, interval, position]);

	return null;
}
