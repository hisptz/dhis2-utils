import React, { useState, useEffect } from "react";
// import { PlayArrow, Pause } from "@mui/icons-material";
import "../styles/index.css";
import { Button } from "@dhis2/ui";
// mock data for months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TimeSliderLayer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (playing) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % months.length);
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
          {playing ? "Pause": "Play"}
        </Button>

        <div className="wrapper">
          {months.map((month, index) => (
            <div key={month} className="wrapper-item">
              <div
                className={`slider ${index === activeIndex ? "active" : ""}`}
              ></div>
              <span className="period">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
