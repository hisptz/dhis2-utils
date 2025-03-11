import { createControlComponent } from "@react-leaflet/core";
import { control, type ControlOptions } from "leaflet";
import "leaflet.fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";

const FullscreenControl: React.ForwardRefExoticComponent<
	ControlOptions & React.RefAttributes<any>
> = createControlComponent((props) => (control as any).fullscreen(props));
export default FullscreenControl;
