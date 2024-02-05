import { last } from "lodash";
import React from "react";
import { LayerGroup, LayersControl, Pane } from "react-leaflet";
import { CustomBubbleLayer } from "../../interfaces/index.js";
import Bubble from "./components/Bubble/index.js";
import Choropleth from "./components/Choropleth/index.js";
import useThematicLayer from "./hooks/config.js";

export default function ThematicLayer({
	layerId,
	index,
}: {
	layerId: string;
	index: number;
}) {
	const layer = useThematicLayer(layerId);

	if (!layer) {
		return null;
	}

	const {
		type,
		dataItem,
		name,
		data,
		enabled,
		legends,
		customEventHandlers,
		onLayerClick,
	} = layer ?? {};
	const uniqueName = name ?? dataItem.displayName;
	return (
		<>
			<LayersControl.Overlay checked={enabled} name={uniqueName}>
				<Pane
					style={{
						zIndex: type === "bubble" ? 500 : 500 - (index + 1),
					}}
					name={uniqueName}
				>
					<LayerGroup>
						{data?.map((datum) =>
							type === "choropleth" ? (
								<Choropleth
									customEventHandlers={customEventHandlers}
									onLayerClick={onLayerClick}
									legends={legends ?? []}
									data={datum}
									key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`}
								/>
							) : null,
						)}
						{data?.map((datum) =>
							type === "bubble" ? (
								<Bubble
									radius={
										(layer as CustomBubbleLayer)?.radius
									}
									legends={legends ?? []}
									highestData={last(data)?.data ?? 1}
									data={datum}
									key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`}
								/>
							) : null,
						)}
					</LayerGroup>
				</Pane>
			</LayersControl.Overlay>
		</>
	);
}
