import { createControlComponent } from "@react-leaflet/core";
import L, { ControlPosition } from "leaflet";
import "leaflet-easyprint";
import React from "react";

const DownloadControlComponent = createControlComponent((props) => {
	return (L as any).easyPrint(props);
});
export default function DownloadControl({ options, position, mapId }: { options: any; position: ControlPosition; mapId: string }) {
  return <DownloadControlComponent {...{ ...options, position }} />;
}
