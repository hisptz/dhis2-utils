import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ControlPosition } from "leaflet";
import TimeSliderLeafletControl from "../utils/TimeSliderLeafletControl";
import TimeSliderLayer from ".";

export default function TimeSliderControlWrapper({
  position,
}: {
  position: ControlPosition;
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  // Instead of ref, listen for the DOM container after mount
  useEffect(() => {
    // Delay so the control mounts first
    setTimeout(() => {
      const controls = document.getElementsByClassName("leaflet-control-timeslider");
      if (controls.length > 0) {
        setContainer(controls[0] as HTMLElement);
      }
    }, 0);
  }, []);

  return (
    <>
      <TimeSliderLeafletControl position={position} />
      {container && ReactDOM.createPortal(<TimeSliderLayer />, container)}
    </>
  );
}
