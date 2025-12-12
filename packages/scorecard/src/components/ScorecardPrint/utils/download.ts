import { find, flatten, mapValues, set } from "lodash";
import type { ScorecardMeta } from "../../MetaProvider";
import type {
	OrgUnitLevelLegend,
	ScorecardConfig,
	ScorecardDataSource,
} from "../../../schemas/config";
import type { ItemMeta } from "../../../hooks/metadata";
import i18n from "@dhis2/d2-i18n";
import {
	getDataSourcesFromGroups,
	getHoldersFromGroups,
} from "../../../utils/dataSources";
import { saveAs } from "file-saver";
import type { AnalyticsData } from "../../../utils/data";

export const ALMA_HEADERS = [
	{
		name: "dx",
		column: "Data",
		valueType: "TEXT",
		type: "java.lang.String",
		hidden: false,
		meta: true,
	},
	{
		name: "pe",
		column: "Period",
		valueType: "TEXT",
		type: "java.lang.String",
		hidden: false,
		meta: true,
	},
	{
		name: "ou",
		column: "Organisation unit",
		valueType: "TEXT",
		type: "java.lang.String",
		hidden: false,
		meta: true,
	},
	{
		name: "value",
		column: "Value",
		valueType: "NUMBER",
		type: "java.lang.Double",
		hidden: false,
		meta: false,
	},
];

export function getALMAMetadata({
	config,
	meta,
}: {
	meta: ScorecardMeta;
	config: ScorecardConfig;
}) {
	const legendDefinitions = config.legendDefinitions;

	function getMetadataDimensions(
		orgUnits: ItemMeta[],
		dataSources: ItemMeta[],
		periods: ItemMeta[],
	) {
		return {
			ou: orgUnits?.map(({ uid }) => uid),
			pe: periods?.map(({ uid }) => uid),
			dx: dataSources?.map(({ uid }) => uid),
			co: [],
		};
	}

	function getAllLegends(legends: ScorecardDataSource["legends"]) {
		if (Array.isArray(legends)) {
			return legends?.map(
				({ startValue, endValue, legendDefinitionId }) => ({
					min: startValue,
					max: endValue,
					color: find(legendDefinitions, ["id", legendDefinitionId])
						?.color,
				}),
			);
		} else {
			return mapValues(legends as OrgUnitLevelLegend, (value) => {
				return value.map(
					({ startValue, endValue, legendDefinitionId }) => ({
						min: startValue,
						max: endValue,
						color: find(legendDefinitions, [
							"id",
							legendDefinitionId,
						])?.color,
					}),
				);
			});
		}
	}

	function getMetadataItems(
		orgUnits: ItemMeta[],
		dataSources: ScorecardDataSource[],
	) {
		const items = {};

		for (const dataSource of dataSources) {
			const { label, id, legends } = dataSource ?? {};
			set(items, [id], {
				name: label,
				legendSet: getAllLegends(legends),
			});
		}

		for (const orgUnit of orgUnits) {
			const { uid, name } = orgUnit ?? {};
			set(items, [uid], {
				name,
				id: uid,
			});
		}

		set(items, "dx", { name: i18n.t("Data") });
		set(items, "pe", { name: i18n.t("Period") });
		set(items, "ou", { name: i18n.t("Organisation Unit") });

		return items;
	}

	const { orgUnits, dataItems, periods } = meta;
	const dataSources = getDataSourcesFromGroups(
		config.dataSelection.dataGroups,
	);
	return {
		dimensions: getMetadataDimensions(orgUnits, dataItems, periods),
		items: getMetadataItems(orgUnits, dataSources),
	};
}

export function downloadALMAMeta({
	config,
	meta,
}: {
	config: ScorecardConfig;
	meta: ScorecardMeta;
}) {
	try {
		const json = JSON.stringify({
			organisationUnits: meta.orgUnits?.map(
				({ uid, level, name, hierarchy }) => {
					return {
						id: uid,
						name,
						level: level ?? hierarchy?.split("/")?.length - 1,
					};
				},
			),
			indicators: flatten(
				getHoldersFromGroups(config.dataSelection.dataGroups)?.map(
					({ dataSources }) =>
						dataSources?.map(({ id, label }) => ({
							id,
							name: label,
						})),
				),
			),
		});
		const blob = new Blob([json], { type: "application/json" });
		saveAs(blob, `${config.title}-metadata.json`);
	} catch (e) {
		console.error(e);
		return e;
	}
}

function getALMAData(data: AnalyticsData[]) {
	return Object.values(data);
}

export function downloadALMAData({
	config,
	meta,
	data,
}: {
	config: ScorecardConfig;
	meta: ScorecardMeta;
	data: AnalyticsData[];
}) {
	try {
		const json = JSON.stringify({
			dataValues: [
				{
					headers: ALMA_HEADERS,
					metaData: getALMAMetadata({
						config,
						meta,
					}),
					rows: getALMAData(data),
				},
			],
		});
		const blob = new Blob([json], { type: "application/json" });
		saveAs(blob, `${config.title}.json`);
	} catch (e) {
		return e;
	}
}
