import {
	compact,
	differenceBy,
	find,
	head,
	isEmpty,
	last,
	sortBy,
} from "lodash";
import { useMapOrganisationUnit, useMapPeriods } from "../../../hooks/index.js";
import { useCallback, useMemo, useState } from "react";
import {
	generateLegends,
	getOrgUnitsSelection,
	sanitizeDate,
	sanitizeOrgUnits,
	toGeoJson,
} from "../../../../../utils/map.js";
import { useDataEngine } from "@dhis2/app-runtime";
import {
	CustomGoogleEngineLayer,
	CustomPointLayer,
	CustomThematicLayer,
	EarthEngineLayerConfig,
	ThematicLayerConfig,
} from "../../../../MapLayer/interfaces";
import { MapOrgUnit, PointOrgUnit } from "../../../../../interfaces/index.js";
import { asyncify, map } from "async-es";
import { LegendSet } from "@hisptz/dhis2-utils";
import {
	defaultClasses,
	defaultColorScaleName,
} from "../../../../../utils/colors.js";
import { useGoogleEngineToken } from "../../../../MapLayer/components/GoogleEngineLayer/hooks/index.js";
import { useBoundaryData } from "../../../../MapLayer/components/BoundaryLayer/hooks/useBoundaryData.js";
import { EarthEngine } from "../../../../MapLayer/components/GoogleEngineLayer/services/engine.js";
import { EARTH_ENGINE_LAYERS } from "../../../../MapLayer/components/GoogleEngineLayer/constants/index.js";
import { EarthEngineOptions } from "../../../../MapLayer/components/GoogleEngineLayer/interfaces/index.js";

const analyticsQuery = {
	analytics: {
		resource: "analytics",
		params: ({ ou, pe, dx, startDate, endDate }: any) => {
			const peDimension = !isEmpty(pe)
				? `pe:${pe?.join(";")}`
				: undefined;
			const ouDimension = !isEmpty(ou)
				? `ou:${ou?.join(";")}`
				: undefined;
			const dxDimension = !isEmpty(dx)
				? `dx:${dx?.join(";")}`
				: undefined;

			return {
				dimension: compact([dxDimension, peDimension, ouDimension]),
				startDate,
				endDate,
				displayProperty: "NAME",
			};
		},
	},
};
const query = {
	layer: {
		resource: "geoFeatures",
		params: ({ ous }: any) => ({
			ou: `ou:${ous.join(";")}`,
		}),
	},
	analytics: {
		resource: "analytics",
		params: ({ ous }: any) => ({
			dimension: [
				`ou:${ous.join(";")}`,
				`pe:${new Date().getFullYear()}`,
			],
			skipData: true,
			hierarchyMeta: true,
		}),
	},
};
const groupSetQuery = {
	groupSet: {
		resource: "organisationUnitGroupSets",
		id: ({ groupSet }: any) => groupSet,
		params: {
			fields: [
				"organisationUnitGroups[name,color,symbol,organisationUnits[id]]",
			],
		},
	},
};
const legendSetsQuery = {
	legendSets: {
		resource: "legendSets",
		id: ({ id }: any) => id,
		params: {
			fields: [
				"id",
				"displayName",
				"legends[id,code,startValue,endValue,color]",
			],
		},
	},
};

export function useThematicLayers(): any {
	const engine = useDataEngine();
	const [loading, setLoading] = useState(false);
	const { orgUnits, orgUnitSelection } = useMapOrganisationUnit();
	const { periods, range } = useMapPeriods() ?? {};
	const ou = useMemo(
		() => getOrgUnitsSelection(orgUnitSelection),
		[orgUnitSelection],
	);
	const pe = useMemo(() => periods?.map((pe: any) => pe.id), [periods]);

	const { startDate, endDate } = useMemo(() => {
		if (!range) {
			return {
				startDate: undefined,
				endDate: undefined,
			};
		}
		return {
			startDate: sanitizeDate(range.start.toDateString()),
			endDate: sanitizeDate(range.end.toDateString()),
		};
	}, [range]);
	const sanitizeData = (data: any, layer: ThematicLayerConfig) => {
		if (data) {
			const { analytics } = data as any;
			const rows = analytics?.rows;
			const ouIndex = analytics.headers.findIndex(
				(header: any) => header.name === "ou",
			);
			const dxIndex = analytics.headers.findIndex(
				(header: any) => header.name === "dx",
			);
			const valueIndex = analytics.headers.findIndex(
				(header: any) => header.name === "value",
			);

			if (!isEmpty(rows)) {
				return sortBy(
					orgUnits?.map((ou: MapOrgUnit) => {
						const row = rows.find(
							(row: any) =>
								row[ouIndex] === ou.id &&
								row[dxIndex] === layer.dataItem.id,
						);
						return {
							orgUnit: ou,
							data: row ? parseFloat(row[valueIndex]) : undefined,
							dataItem: {
								...layer.dataItem,
							},
						};
					}),
					["data"],
				);
			}
			return [];
		}
		return [];
	};

	const sanitizeLegends = async (
		layers: CustomThematicLayer[],
	): Promise<CustomThematicLayer[]> => {
		return (await map(
			layers,
			asyncify(async (layer: CustomThematicLayer) => {
				try {
					const legends = [];
					if (layer.dataItem.legendSet) {
						const legendSetData = await engine.query(
							legendSetsQuery,
							{
								variables: {
									id: layer.dataItem.legendSet,
								},
							},
						);
						const legendSet: LegendSet =
							legendSetData?.legendSets as LegendSet;
						if (legendSet) {
							legends.push(...legendSet.legends);
						}
					} else {
						const { scale, colorClass } = layer.dataItem
							.legendConfig ?? {
							scale: defaultClasses,
							colorClass: defaultColorScaleName,
						};
						const sortedData = sortBy(
							layer.data.filter((datum) => !!datum.data),
							"data",
						);
						const autoLegends = generateLegends(
							last(sortedData)?.data ?? 0,
							head(sortedData)?.data ?? 0,
							{
								classesCount: scale,
								colorClass,
							},
						);
						legends.push(...autoLegends);
					}
					return {
						...layer,
						legends,
					};
				} catch (e) {
					return layer;
				}
			}),
		)) as CustomThematicLayer[];
	};

	const sanitizeLayers = async (
		layers: ThematicLayerConfig[],
	): Promise<CustomThematicLayer[]> => {
		try {
			setLoading(true);
			const layersWithoutData = layers?.filter((layer) => !layer.data);
			const layersWithData = differenceBy(
				layers,
				layersWithoutData,
				"id",
			);
			const dx = layersWithoutData.map((layer) => layer.dataItem.id);
			let sanitizedLayersWithData: any = [];

			if (!isEmpty(dx)) {
				const data = await engine.query(analyticsQuery, {
					variables: {
						dx,
						ou,
						pe,
						startDate,
						endDate,
					},
				});
				sanitizedLayersWithData = layersWithoutData.map((layer) => ({
					...layer,
					name:
						layer?.name ?? layer?.dataItem?.displayName ?? layer.id,
					data: sanitizeData(data, layer),
				}));
			}
			const sanitizedLayersWithOrgUnits = layersWithData.map((layer) => ({
				...layer,
				data: layer.data?.map((datum) => ({
					...datum,
					orgUnit: find(orgUnits, [
						"id",
						datum.orgUnit,
					]) as MapOrgUnit,
					dataItem: layer.dataItem,
					name:
						layer?.name ?? layer?.dataItem?.displayName ?? layer.id,
				})),
			}));
			setLoading(false);
			return await sanitizeLegends([
				...sanitizedLayersWithData,
				...sanitizedLayersWithOrgUnits,
			]);
		} catch (e: any) {
			console.error(`Error getting thematic layers`, e.details);
			setLoading(false);
			return [];
		}
	};

	return {
		sanitizeLayers,
		loading,
	};
}

export function usePointLayer() {
	const engine = useDataEngine();
	const { orgUnitSelection } = useMapOrganisationUnit();
	const [loading, setLoading] = useState(false);

	const sanitizePointData = useCallback(
		(orgUnitData: any, groupSetData: any): PointOrgUnit[] => {
			const { analytics, layer } = (orgUnitData as any) ?? {};
			const rawOrgUnits = sanitizeOrgUnits(analytics?.metaData);
			const geoJSONObjects = toGeoJson(
				layer?.filter((bound: any) => bound.co),
			);
			return compact(
				rawOrgUnits.map((orgUnit: any) => {
					const geoJSONObject: any = geoJSONObjects?.find(
						(geoJSON: any) => geoJSON.properties.id === orgUnit.id,
					);
					const orgUnitGroups: any =
						(groupSetData?.groupSet as any)
							?.organisationUnitGroups ?? [];
					const ouGroup = find(
						orgUnitGroups,
						(ouGroup) =>
							!!find(ouGroup?.organisationUnits ?? [], [
								"id",
								orgUnit.id,
							]),
					);

					if (
						!geoJSONObject ||
						geoJSONObject.properties.type !== "Point"
					) {
						return;
					}
					return {
						...orgUnit,
						geoJSON: geoJSONObject,
						level: geoJSONObject.properties.level,
						icon: {
							type: "groupIcon",
							icon: ouGroup?.symbol,
						},
					};
				}),
			);
		},
		[],
	);

	const sanitizeLayer = useCallback(
		async (
			layer: CustomPointLayer,
		): Promise<CustomPointLayer | undefined> => {
			try {
				if (!layer.level && !layer.group) {
					return;
				}
				setLoading(true);
				const level = layer.level ? `LEVEL-${layer.level}` : undefined;
				const group = layer.group
					? `OU_GROUP-${layer.group}`
					: undefined;
				const ous = [
					...getOrgUnitsSelection(orgUnitSelection),
					level,
					group,
				];

				const pointData = await engine.query(query, {
					variables: {
						ous,
					},
				});
				const groupSetData = await engine.query(groupSetQuery, {
					variables: {
						groupSet: layer.style?.groupSet,
					},
				});
				const sanitizedOrgUnitData = sanitizePointData(
					pointData,
					groupSetData,
				);

				const orgUnitGroups =
					(groupSetData?.groupSet as any)?.organisationUnitGroups ??
					[];

				const sanitizedOrgUnitGroups = orgUnitGroups.map(
					(ouGroup: any) => ({
						...ouGroup,
						organisationUnits: undefined,
					}),
				);
				setLoading(false);
				return {
					...layer,
					points: sanitizedOrgUnitData,
					style: {
						...layer.style,
						orgUnitGroups: sanitizedOrgUnitGroups,
					},
				};
			} catch (e: any) {
				setLoading(false);
				console.error(`Error getting point layer`, e.details);
				return;
			}
		},
		[],
	);

	return {
		loading,
		sanitizeLayer,
	};
}

export function useGoogleEngineLayers() {
	const { refresh } = useGoogleEngineToken();
	const orgUnits = useBoundaryData();

	async function getImageUrl(
		earthEngine: EarthEngine,
		{ filters }: EarthEngineLayerConfig,
	): Promise<string | undefined> {
		if (earthEngine.initialized) {
			try {
				earthEngine.setOrgUnits(orgUnits ?? []);
				const period = filters?.period;
				if (period) {
					earthEngine.setPeriod(period);
				}
				return earthEngine.url();
			} catch (e) {
				console.error(e);
			}
		}
	}

	const sanitizeLayers = useCallback(
		async (
			layers: EarthEngineLayerConfig[],
		): Promise<CustomGoogleEngineLayer[]> => {
			if (isEmpty(layers)) {
				return [];
			}
			try {
				const { token } = await refresh();
				if (!token) {
					console.error(
						`Google token not available in this instance`,
					);
					return [];
				}
				await EarthEngine.setToken(token, refresh);
				return map(
					layers,
					asyncify(async (layer: EarthEngineLayerConfig) => {
						try {
							const defaultOptions: any =
								find(EARTH_ENGINE_LAYERS, ["id", layer.type]) ??
								{};
							const options: EarthEngineOptions = {
								...defaultOptions,
								aggregations:
									layer.aggregations ??
									defaultOptions?.aggregations,
								params: layer.params ?? defaultOptions?.params,
							};
							const updatedLayer = {
								...layer,
								options,
							};
							const earthEngine = new EarthEngine({ options });
							const url = await getImageUrl(
								earthEngine,
								updatedLayer,
							);
							return {
								...updatedLayer,
								engine: earthEngine,
								url,
							};
						} catch (e) {
							console.error(e);
							return;
						}
					}),
				);
			} catch (e: any) {
				console.error(`Error getting thematic layers`, e.details);
				return [];
			}
		},
		[refresh],
	);

	return {
		sanitizeLayers,
	};
}
