import { createControlComponent } from "@react-leaflet/core";
import { TimeSliderControl } from "./index" // import the class from above

const TimeSliderLeafletControl = createControlComponent((props) => {
  return new TimeSliderControl({ position: props.position ?? "bottomright" });
});

export default TimeSliderLeafletControl;
