import React, { useMemo } from "react";
import { useVisualizationType } from "../VisualizationTypeProvider/index.js";
import { useAnalyticsData } from "../AnalyticsDataProvider/index.js";
import { CircularLoader } from "@dhis2/ui";
import {
	DHIS2PivotTable,
	DHIS2PivotTableOptions,
} from "../../../DHIS2PivotTable/index.js";
import { useLayout } from "../LayoutProvider/index.js";
import { filter, find, findIndex, forEach, mapValues, set } from "lodash";
import { Dimension, useDimensions } from "../DimensionsProvider/index.js";
import i18n from "@dhis2/d2-i18n";
import { ChartConfig, DHIS2Chart } from "../../../ChartAnalytics/index.js";
import { VisualizationConfig } from "../../index.js";
import { DHIS2Map, MapProps } from "../../../Map/index.js";
import { OrgUnitSelection } from "@hisptz/dhis2-utils";
import {
	ThematicLayerConfig,
	ThematicLayerRawData,
} from "../../../Map/components/MapLayer/interfaces/index.js";
import type { PivotTableLayoutProps } from "../../../DHIS2PivotTable/components/Table/index.js";

export interface VisualizationSelectorProps {
	config: VisualizationConfig;
}

export function getDimensionLabel(dimension: Dimension) {
	switch (dimension) {
		case "pe":
			return i18n.t("Period");
		case "ou":
			return i18n.t("Organisation unit");
		case "dx":
			return i18n.t("Data");
		default:
			return "";
	}
}

export function getOrgUnitSelectionFromIds(ous: string[]) {
	const orgUnitSelection: OrgUnitSelection = {
		orgUnits: [],
	};
	forEach(ous, (ou) => {
		if (ou === "USER_ORGUNIT") {
			set(orgUnitSelection, ["userOrgUnit"], true);
		} else if (ou === "USER_ORGUNIT_CHILDREN") {
			set(orgUnitSelection, ["userSubUnit"], true);
		} else if (ou === "USER_ORGUNIT_GRANDCHILDREN") {
			set(orgUnitSelection, ["userSubX2Unit"], true);
		} else {
			const orgUnits = [...(orgUnitSelection.orgUnits ?? [])];
			orgUnits.push({
				id: ou,
				children: [],
				path: "",
			});
			set(orgUnitSelection, ["orgUnits"], orgUnits);
		}
	});
	return orgUnitSelection;
}

export function PivotTableRenderer({
	options,
}: {
	options: DHIS2PivotTableOptions & PivotTableLayoutProps;
}) {
	const [layout] = useLayout();
	const { analytics } = useAnalyticsData();

	const sanitizedLayout = useMemo(() => {
		return mapValues(layout, (dimension) =>
			dimension.map((dimension) => ({
				dimension,
				label: getDimensionLabel(dimension),
			})),
		);
	}, [layout]);

	if (!analytics) {
		return null;
	}

	return (
		<DHIS2PivotTable
			tableProps={{
				scrollHeight: options.scrollHeight ?? "100%",
				scrollWidth: options.scrollWidth ?? "100%",
				width: options.width ?? "100%",
			}}
			analytics={analytics}
			config={{ layout: sanitizedLayout, options }}
		/>
	);
}

export function ChartRenderer({ options }: { options: ChartConfig }) {
	const { analytics } = useAnalyticsData();
	if (!analytics) {
		return null;
	}
	return <DHIS2Chart analytics={analytics} config={{ ...options }} />;
}

export function MapRenderer({
	options,
}: {
	options: Omit<MapProps, "orgUnitSelection" | "periodSelection">;
}) {
	const [dimensions] = useDimensions();
	const { analytics } = useAnalyticsData();
	const orgUnitSelection: OrgUnitSelection = useMemo(() => {
		return getOrgUnitSelectionFromIds(dimensions.ou ?? []);
	}, [dimensions.ou]);

	const thematicLayers: ThematicLayerConfig[] = useMemo(() => {
		const valueIndex =
			findIndex(analytics.headers, ["name", "value"]) ?? -1;
		return (
			analytics.metaData?.dimensions["dx"]?.map((dataId) => {
				const config = find(options.thematicLayers, ["id", dataId]);
				const data: ThematicLayerRawData[] =
					analytics.metaData?.dimensions?.ou?.map((ouId) => {
						const values = filter(
							analytics.rows,
							(row) => row.includes(dataId) && row.includes(ouId),
						) as unknown as string[];
						const value = values.reduce(
							(acc, value) => acc + parseFloat(value[valueIndex]),
							0,
						);
						return {
							data: value,
							dataItem: dataId,
							orgUnit: ouId,
						};
					}) ?? [];
				return {
					...config,
					data,
				} as ThematicLayerConfig;
			}) ?? []
		);
	}, [analytics]);

	return (
		<DHIS2Map
			orgUnitSelection={orgUnitSelection}
			thematicLayers={thematicLayers}
		/>
	);
}

export function VisualizationSelector({ config }: VisualizationSelectorProps) {
	const [type] = useVisualizationType();
	const { analytics, loading } = useAnalyticsData();

	if (loading) {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularLoader small />
			</div>
		);
	}
	if (!analytics) {
		return null;
	}

	return (
		<>
			{type === "pivotTable" && (
				<PivotTableRenderer
					options={config?.pivotTable as DHIS2PivotTableOptions}
				/>
			)}
			{type === "chart" && (
				<ChartRenderer options={config?.chart as ChartConfig} />
			)}
			{type === "map" && (
				<MapRenderer
					options={
						config?.map as Omit<
							MapProps,
							"orgUnitSelection" | "periodSelection"
						>
					}
				/>
			)}
		</>
	);
}
