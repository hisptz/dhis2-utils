import React, { useEffect, useState } from "react";
// import { PlayArrow, Pause } from "@mui/icons-material";
import "../styles/index.css";
import { Button } from "@dhis2/ui";
import { useMapPeriods } from "../../../MapProvider/hooks";

export default function TimeSliderLayer({
	slideInterval,
}: {
	slideInterval?: number;
}) {
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
			}, slideInterval); // Change every 1 second
		}

		return () => clearInterval(interval);
	}, [playing]);

	const handlePlayClick = () => {
		setPlaying((prev) => !prev);
	};
	const handleSliderClick = (index: number) => {
		setActiveIndex(index);
		if (playing) {
			setPlaying(false);
		}
	};

	return (
		<div className="container">
			<div className="container-wrapper">
				<Button small={true} secondary onClick={handlePlayClick}>
					{playing ? "Pause" : "Play"}
				</Button>
				<div className="wrapper">
					{periods?.map((period, index) => (
						<div key={period?.id? `${period.id}` : `period-${index}`} className="wrapper-item">
							<div
								className={`slider ${index === activeIndex ? "active" : ""}`}
								onClick={() => handleSliderClick(index)}
							></div>
							<span className="period">{period.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
