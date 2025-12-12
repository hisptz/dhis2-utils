import { Marker } from "react-leaflet";
import { getLabel } from "../../utils/label";
import type { LayerLabelConfig } from "../../../../interfaces";
import L, { type LatLngExpression } from "leaflet";
import "./label.css";
import { getTextColorFromBackgroundColor } from "../../../../../../../DHIS2PivotTable/utils/color";

export function LabelMarker({
	labelConfig,
	data,
	orgUnit,
	center,
	layerColor,
}: {
	labelConfig: LayerLabelConfig;
	data: number | undefined;
	orgUnit: { name: string };
	center: LatLngExpression;
	layerColor: string;
}) {
	const label = getLabel({
		labelConfig,
		data,
		orgUnit,
	});

	const labelIcon = L.divIcon({
		className: "label-icon",
		html: `<span style="color: ${getTextColorFromBackgroundColor(layerColor)}; text-align: center; font-size: 12px">${label}</span>`,
	});

	return <Marker zIndexOffset={1000} icon={labelIcon} position={center} />;
}
