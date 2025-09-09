import React, { useEffect, useState } from "react";
// import { PlayArrow, Pause } from "@mui/icons-material";
import "../styles/index.css";
import { Button } from "@dhis2/ui";
import { useMapPeriods } from "../../../../MapProvider/hooks";
// mock data for months

export default function TimeSliderLayer() {
	const { periods } = useMapPeriods() ?? { periods: [] };
	const [activeIndex, setActiveIndex] = useState(0);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (playing) {
			interval = setInterval(() => {
				setActiveIndex(
					(prevIndex) => (prevIndex + 1) % (periods ?? []).length,
				);
			}, 1000); // Change every 1 second
		}

		return () => clearInterval(interval);
	}, [playing]);

	const handlePlayClick = () => {
		setPlaying((prev) => !prev);
	};

	return (
		<div className="container">
			<div className="container-wrapper">
				<Button small={true} secondary onClick={handlePlayClick}>
					{playing ? "Pause" : "Play"}
				</Button>
				<div className="wrapper">
					{periods?.map((period, index) => (
						<div key={period.id} className="wrapper-item">
							<div
								className={`slider ${index === activeIndex ? "active" : ""}`}
							></div>
							<span className="period">{period.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
