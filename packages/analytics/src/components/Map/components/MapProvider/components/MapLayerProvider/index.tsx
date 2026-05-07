import i18n from "@dhis2/d2-i18n";
import { Center, CircularLoader } from "@dhis2/ui";
import { LayersControlEvent } from "leaflet";
import { compact, find, head, set } from "lodash";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { MapLayersContext } from "../../../../state";
import { MapLayerConfig } from "../../../MapArea/interfaces";
import {
	CustomBoundaryLayer,
	CustomGoogleEngineLayer,
	CustomMapLayer,
	CustomPointLayer,
	CustomThematicLayer,
	ThematicLayerConfig,
} from "../../../MapLayer/interfaces";
import { useMapOrganisationUnit, useMapPeriodFilter, useMapPeriods } from "../../hooks";
import {
	useGoogleEngineLayers,
	usePointLayer,
	useThematicLayers,
} from "./hooks";
import type { MapAnalyticsOptions } from "../../../../interfaces";

export function MapLayersProvider({
	layers,
	children,
	analyticsOptions,
}: {
	layers: MapLayerConfig;
	children: ReactNode;
	analyticsOptions?: MapAnalyticsOptions;
}) {
	const period = useMapPeriods();
	const orgUnit = useMapOrganisationUnit();
	const { activePeriod, periodType } = useMapPeriodFilter();
	const [updatedLayers, setUpdatedLayers] = useState<
		Array<
			| CustomThematicLayer
			| CustomBoundaryLayer
			| CustomPointLayer
			| CustomGoogleEngineLayer
		>
	>([]);
	const { sanitizeLayers: sanitizeThematicLayers, refilterLayers: refilterThematicLayers, error } = useThematicLayers(
		{
			analyticsOptions,
		},
	);
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
	}, [period, orgUnit, periodType]);

	useEffect(() => {
		if (activePeriod === null) return;
		const { thematicLayers } = layers;
		if (!thematicLayers?.length) return;
		refilterThematicLayers([...(thematicLayers as ThematicLayerConfig[])])
			.then((updated: CustomThematicLayer[]) => {
				setUpdatedLayers((prev) => [
					...prev.filter((l) => !updated.find((u) => u.id === l.id)),
					...updated,
				]);
			})
			.catch(console.error);
	}, [activePeriod]);

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
