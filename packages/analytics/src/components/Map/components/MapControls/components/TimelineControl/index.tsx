import { axisBottom } from "d3-axis";
import { scaleTime } from "d3-scale";
import { select } from "d3-selection";
import { DomEvent, DomUtil } from "leaflet";
import { DateTime, type DurationObjectUnits } from "luxon";
import { createPortal } from "react-dom";
import {
	type ReactElement,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useMap } from "react-leaflet";
import { MapPeriodFilterContext } from "../../../../state/index.js";
import { dateToDHIS2PeriodId, type DHIS2PeriodType } from "../../../../utils/helpers.js";

export type { DHIS2PeriodType };

export type TimelineRange =
	| { range: [Date, Date]; step: DurationObjectUnits }
	| { range: [Date, Date, ...Date[]] };

export type TimelinePosition =
	| "bottom"
	| "bottomleft"
	| "bottomright"
	| "bottomcenter"
	| "top"
	| "topleft"
	| "topright"
	| "topcenter";

export interface TimelineControlOptions {
	autoplay?: boolean;
	button?: {
		pausedText?: string;
		playingText?: string;
	};
	interval?: number;
	periodType?: DHIS2PeriodType;
	position?: TimelinePosition;
	timeline: {
		dateFormat: string;
	} & TimelineRange;
}

function resolveDates(tl: TimelineControlOptions["timeline"]): Date[] {
	if ("step" in tl) {
		const [start, end] = tl.range;
		const dates: Date[] = [];
		let cur = DateTime.fromJSDate(start);
		const endDt = DateTime.fromJSDate(end);
		while (cur <= endDt) {
			dates.push(cur.toJSDate());
			cur = cur.plus(tl.step);
		}
		return dates;
	}
	return [...tl.range];
}

const ACCENT = "#2c6693";
const PADDING_LEFT = 40;   // space for play/pause icon
const PADDING_RIGHT = 20;
const LABEL_WIDTH = 80;    // min pixels per axis tick label
const PERIOD_RECT_HEIGHT = 8;
const PERIOD_RECT_GAP = 1; // gap between adjacent period rects
const AXIS_OFFSET = 4;     // pixels between rect bottom and axis line


function TimelineUI({
	autoplay: initialAutoplay,
	button,
	dates,
	interval,
	onStep,
}: {
	autoplay: boolean;
	button?: TimelineControlOptions["button"];
	dates: Date[];
	interval: number;
	onStep: (date: Date) => void;
}): ReactElement {
	const [index, setIndex] = useState(0);
	const [playing, setPlaying] = useState(initialAutoplay);
	const [svgWidth, setSvgWidth] = useState<number | null>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const axisRef = useRef<SVGGElement>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		const el = svgRef.current;
		if (!el) return;
		const measure = (): void => { setSvgWidth(el.getBoundingClientRect().width); };
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => { ro.disconnect(); };
	}, []);

	const trackWidth = svgWidth !== null ? svgWidth - PADDING_LEFT - PADDING_RIGHT : 0;

	const timeScale = useMemo(() => {
		if (!trackWidth || dates.length < 2) return null;
		const periodMs = dates[1].getTime() - dates[0].getTime();
		const domainEnd = new Date(dates[dates.length - 1].getTime() + periodMs);
		return scaleTime()
			.domain([dates[0], domainEnd])
			.range([0, trackWidth]);
	}, [dates, trackWidth]);

	useEffect(() => {
		if (!timeScale || !axisRef.current || !trackWidth) return;
		const maxTicks = Math.round(trackWidth / LABEL_WIDTH);
		const axis = axisBottom<Date>(timeScale).ticks(maxTicks);
		select<SVGGElement, unknown>(axisRef.current).call(axis);
		select(axisRef.current).select(".domain").attr("stroke", "#ccc");
		select(axisRef.current).selectAll(".tick line").attr("stroke", "#ccc");
		select(axisRef.current)
			.selectAll<SVGTextElement, unknown>(".tick text")
			.attr("fill", "#666")
			.attr("font-size", "10px")
			.attr("font-family", "sans-serif");
	}, [timeScale, trackWidth]);

	const stepTo = useCallback(
		(idx: number) => {
			setIndex(idx);
			onStep(dates[idx]);
		},
		[dates, onStep],
	);

	// Autoplay interval
	useEffect(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		if (!playing) return;
		intervalRef.current = setInterval(() => {
			setIndex((prev) => {
				const next = prev + 1 >= dates.length ? 0 : prev + 1;
				onStep(dates[next]);
				return next;
			});
		}, interval);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [playing, interval, dates, onStep]);

	const periodRects = useMemo(() => {
		if (!timeScale || dates.length < 2) return null;
		const unitWidth = timeScale(dates[1]) - timeScale(dates[0]);
		return dates.map((date, i) => {
			const x = timeScale(date);
			const spanWidth = i < dates.length - 1
				? timeScale(dates[i + 1]) - x
				: unitWidth;
			const w = Math.max(spanWidth - PERIOD_RECT_GAP, 1);
			const capturedIndex = i;
			return (
				<rect
					key={date.toISOString()}
					fill={capturedIndex === index ? ACCENT : "#b0c4d8"}
					height={PERIOD_RECT_HEIGHT}
					onClick={() => { setPlaying(false); stepTo(capturedIndex); }}
					rx={1}
					style={{ cursor: "pointer" }}
					width={w}
					x={x}
					y={0}
				/>
			);
		});
	}, [timeScale, dates, index, stepTo]);


	const RECT_ROW_Y = 6;
	const svgHeight = RECT_ROW_Y + PERIOD_RECT_HEIGHT + AXIS_OFFSET + 24

	const playLabel = playing
		? (button?.playingText ?? "Pause")
		: (button?.pausedText ?? "Play");

	return (
		<svg
			aria-label="Timeline"
			height={svgHeight}
			ref={svgRef}
			style={{
				background: "white",
				boxShadow: "0 -1px 4px rgba(0,0,0,0.15)",
				display: "block",
				width: "100%",
			}}
		>
			{/* Play / Pause — Material Design SVG icon */}
			<g
				aria-label={playLabel}
				onClick={() => { setPlaying((p) => !p); }}
				role="button"
				style={{ cursor: "pointer" }}
				transform={`translate(7, ${RECT_ROW_Y - 8})`}
			>
				<path d="M0 0h24v24H0z" fillOpacity={0} />
				{playing
					? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill={ACCENT} />
					: <path d="M8 5v14l11-7z" fill={ACCENT} />
				}
			</g>

			{/* Period rectangles */}
			{timeScale !== null && (
				<g transform={`translate(${PADDING_LEFT}, ${RECT_ROW_Y})`}>
					{periodRects}
				</g>
			)}

			{/* D3 x-axis */}
			{timeScale !== null && (
				<g
					ref={axisRef}
					transform={`translate(${PADDING_LEFT}, ${RECT_ROW_Y + PERIOD_RECT_HEIGHT + AXIS_OFFSET})`}
				/>
			)}
		</svg>
	);
}


export function TimelineControl({
	autoplay = false,
	button,
	interval = 1000,
	periodType,
	position = "bottom",
	timeline,
}: TimelineControlOptions): ReactElement | null {
	const map = useMap();
	const {
		periodType: contextPeriodType,
		setActivePeriod,
		setPeriodType,
	} = useContext(MapPeriodFilterContext);
	const [container, setContainer] = useState<HTMLElement | null>(null);

	useEffect(() => {
		if (periodType) setPeriodType(periodType);
	}, [periodType, setPeriodType]);

	const resolvedPeriodType = periodType ?? contextPeriodType ?? "Monthly";
	const dates = useMemo(() => resolveDates(timeline), [timeline]);

	useEffect(() => {
		const mapEl = map.getContainer();
		const div = DomUtil.create("div", "", mapEl);
		DomEvent.disableClickPropagation(div);
		DomEvent.disableScrollPropagation(div);

		const isTop = position.startsWith("top");
		Object.assign(div.style, {
			bottom: isTop ? "auto" : "18px",
			boxSizing: "border-box",
			left: "0",
			padding: isTop ? "8px 8px 0" : "0 8px 8px",
			position: "absolute",
			right: "0",
			top: isTop ? "0" : "auto",
			zIndex: "1000",
		});

		setContainer(div);
		return () => {
			div.remove();
			setContainer(null);
		};
	}, [map, position]);

	const handleStep = useCallback(
		(date: Date) => {
			setActivePeriod(dateToDHIS2PeriodId(date, resolvedPeriodType));
		},
		[resolvedPeriodType, setActivePeriod],
	);

	if (!container) return null;

	return createPortal(
		<TimelineUI
			autoplay={autoplay}
			button={button}
			dates={dates}
			interval={interval}
			onStep={handleStep}
		/>,
		container,
	);
}
