import { createControlComponent } from "@react-leaflet/core";
import { control, type ControlOptions } from "leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

const FullscreenControl: ForwardRefExoticComponent<
	ControlOptions & RefAttributes<any>
> = createControlComponent((props) => (control as any).fullscreen(props));
export default FullscreenControl;
