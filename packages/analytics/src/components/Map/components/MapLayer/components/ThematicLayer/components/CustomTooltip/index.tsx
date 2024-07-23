import i18n from "@dhis2/d2-i18n";
import React from "react";
import { Pane, Popup, Tooltip } from "react-leaflet";
import { useMapPeriods } from "../../../../../MapProvider/hooks/index.js";
import { ThematicLayerData } from "../../../../interfaces/index.js";

export default function CustomTooltip({
	data: dataObject,
}: {
	data: ThematicLayerData;
}) {
	const { dataItem, orgUnit, data } = dataObject ?? {};
	const { periods } = useMapPeriods() ?? {};

	const formatter = Intl.NumberFormat(navigator.language, {}).format;

	const formattedData = data ? formatter(data as number) : "";

	return (
		<Pane
			name={`${dataItem.displayName}-${orgUnit.id}-popup-pane`}
			pane="popupPane"
		>
			<Tooltip>
				{orgUnit?.name} ({formattedData})
			</Tooltip>
			<Popup minWidth={80}>
				<h3 style={{ margin: 0 }}>{orgUnit?.name}</h3>
				<div>{dataItem?.displayName}</div>
				<div>{periods?.map((period) => period.name).join(",")}</div>
				<div>
					{i18n.t("Value")}: {formattedData}
				</div>
			</Popup>
		</Pane>
	);
}
