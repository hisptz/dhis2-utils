import i18n from "@dhis2/d2-i18n";
import { Center, CircularLoader } from "@dhis2/ui";
import { LayersControlEvent } from "leaflet";
import { compact, find, head, set } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapLayersContext } from "../../../../state/index.js";
import { MapLayerConfig } from "../../../MapArea/interfaces/index.js";
import {
	CustomBoundaryLayer,
	CustomGoogleEngineLayer,
	CustomMapLayer,
	CustomPointLayer,
	CustomThematicLayer,
	ThematicLayerConfig,
} from "../../../MapLayer/interfaces/index.js";
import { useMapOrganisationUnit, useMapPeriods } from "../../hooks/index.js";
import {
	useGoogleEngineLayers,
	usePointLayer,
	useThematicLayers,
} from "./hooks/index.js";

export function MapLayersProvider({
	layers,
	children,
}: {
	layers: MapLayerConfig;
	children: React.ReactNode;
}) {
	const period = useMapPeriods();
	const orgUnit = useMapOrganisationUnit();
	const [updatedLayers, setUpdatedLayers] = useState<
		Array<
			| CustomThematicLayer
			| CustomBoundaryLayer
			| CustomPointLayer
			| CustomGoogleEngineLayer
		>
	>([]);
	const { sanitizeLayers: sanitizeThematicLayers, error } =
		useThematicLayers();
	const { sanitizeLayer: sanitizePointLayer } = usePointLayer();
	const { sanitizeLayers: sanitizeEarthEngineLayers } =
		useGoogleEngineLayers();
	const [loading, setLoading] = useState(false);

	useMapEvents({
		overlayremove: (event) => {
			setupLayerListeners("remove", event);
		},
		overlayadd: (event) => {
			setupLayerListeners("add", event);
		},
	});

	const sanitizeLayers = async () => {
		setLoading(true);
		try {
			const {
				boundaryLayers,
				thematicLayers,
				pointLayers,
				earthEngineLayers,
			} = layers;
			const sanitizedThematicLayers = await sanitizeThematicLayers([
				...(thematicLayers ?? []),
			] as ThematicLayerConfig[]);
			const sanitizedBoundaryLayers = (boundaryLayers ??
				[]) as CustomBoundaryLayer[];
			const sanitizedPointLayer = head(pointLayers ?? [])
				? await sanitizePointLayer(
						head(pointLayers) as CustomPointLayer,
					)
				: undefined;
			const sanitizedEarthEngineLayers = await sanitizeEarthEngineLayers([
				...(earthEngineLayers ?? []),
			] as unknown as CustomGoogleEngineLayer[]);
			setUpdatedLayers(
				compact([
					...(sanitizedBoundaryLayers ?? []),
					...(sanitizedThematicLayers ?? []),
					sanitizedPointLayer,
					...(sanitizedEarthEngineLayers ?? []),
				]),
			);
		} catch (e: any) {
			console.error(`Error sanitizing layers`, e.toString());
		}
		setLoading(false);
	};

	const updateLayer = useCallback(
		(id: string, updatedLayer: CustomMapLayer) => {
			setUpdatedLayers((prevLayers) => {
				const updatedLayers = [...prevLayers];
				const layerIndex = updatedLayers.findIndex(
					(layer) => layer.id === updatedLayer.id,
				);
				if (layerIndex < 0) {
					return prevLayers;
				}
				set(updatedLayers, layerIndex, updatedLayer);
				return updatedLayers;
			});
		},
		[],
	);

	useEffect(() => {
		sanitizeLayers().catch(console.error);
	}, [period, orgUnit]);

	const setupLayerListeners = (
		type: "add" | "remove",
		event: LayersControlEvent,
	) => {
		const name = event.name;

		const layerConfig = find(updatedLayers, (layer: any) => {
			const nameFromConfig =
				layer?.name ?? layer?.dataItem?.displayname ?? layer?.label;
			return nameFromConfig === name;
		});

		if (layerConfig) {
			updateLayer(layerConfig.id, {
				...layerConfig,
				enabled: type === "add",
			});
		}
	};

	if (loading) {
		return (
			<div style={{ height: "100%", width: "100%" }}>
				<Center>
					<CircularLoader small />
				</Center>
			</div>
		);
	}
	if (error) {
		return (
			<div style={{ height: "100%", width: "100%" }}>
				<Center>
					<h4>
						{i18n.t("Error")}: {error.message}
					</h4>
				</Center>
			</div>
		);
	}
	return (
		<MapLayersContext.Provider
			value={{ layers: updatedLayers, updateLayer }}
		>
			{children}
		</MapLayersContext.Provider>
	);
}
