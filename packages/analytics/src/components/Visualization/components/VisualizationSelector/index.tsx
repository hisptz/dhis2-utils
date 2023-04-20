import React, {useMemo} from "react"
import {useVisualizationType} from "../VisualizationTypeProvider";
import {useAnalyticsData} from "../AnalyticsDataProvider";
import {CircularLoader} from "@dhis2/ui"
import {CustomPivotTable, CustomPivotTableOptions} from "../../../CustomPivotTable";
import {useLayout} from "../LayoutProvider";
import {filter, find, findIndex, forEach, mapValues, set} from "lodash";
import {Dimension, useDimensions} from "../DimensionsProvider";
import i18n from '@dhis2/d2-i18n';
import {ChartAnalytics, ChartConfig} from "../../../ChartAnalytics";
import {VisualizationConfig} from "../../index";
import {Map, MapProps} from "../../../Map";
import {OrgUnitSelection} from "@hisptz/dhis2-utils";
import {ThematicLayerConfig, ThematicLayerRawData} from "../../../Map/components/MapLayer/interfaces";
import {PivotTableLayoutProps} from "../../../CustomPivotTable/components/Table";

export interface VisualizationSelectorProps {
    config: VisualizationConfig;
    height: number
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
            return ""
    }
}

export function getOrgUnitSelectionFromIds(ous: string[]) {
    const orgUnitSelection: OrgUnitSelection = {
        orgUnits: []
    };
    forEach(ous, (ou) => {
        if (ou === "USER_ORGUNIT") {
            set(orgUnitSelection, ["userOrgUnit"], true)
        } else if (ou === "USER_ORGUNIT_CHILDREN") {
            set(orgUnitSelection, ["userSubUnit"], true)
        } else if (ou === "USER_ORGUNIT_GRANDCHILDREN") {
            set(orgUnitSelection, ["userSubX2Unit"], true)
        } else {
            const orgUnits = [...(orgUnitSelection.orgUnits ?? [])];
            orgUnits.push({
                id: ou,
                children: []
            })
            set(orgUnitSelection, ['orgUnits'], orgUnits);
        }
    })
    return orgUnitSelection;
}

export function PivotTableRenderer({options}: { options: CustomPivotTableOptions & PivotTableLayoutProps }) {
    const [layout] = useLayout();
    const {analytics} = useAnalyticsData();

    const sanitizedLayout = useMemo(() => {
        return mapValues(layout, (dimension) => dimension.map(dimension => ({
            dimension,
            label: getDimensionLabel(dimension)
        })))
    }, [layout]);

    if (!analytics) {
        return null;
    }

    return <CustomPivotTable tableProps={{
        scrollHeight: options.scrollHeight ?? "100%",
        scrollWidth: options.scrollWidth ?? "100%",
        width: options.width ?? "100%",
    }} analytics={analytics}
                             config={{layout: sanitizedLayout, options}}/>;
}

export function ChartRenderer({options, height}: { options: ChartConfig, height: number }) {
    const {analytics} = useAnalyticsData();
    if (!analytics) {
        return null;
    }
    return <ChartAnalytics analytics={analytics} config={{...options, height}}/>
}

export function MapRenderer({options}: {
    options: Omit<MapProps, "orgUnitSelection" | "periodSelection">
}) {
    const [dimensions] = useDimensions();
    const {analytics} = useAnalyticsData();
    const orgUnitSelection: OrgUnitSelection = useMemo(() => {
        return getOrgUnitSelectionFromIds(dimensions.ou ?? []);
    }, [dimensions.ou]);

    const thematicLayers: ThematicLayerConfig[] = useMemo(() => {
        const valueIndex = findIndex(analytics.headers, ['name', 'value']) ?? -1
        return analytics.metaData?.dimensions["dx"]?.map((dataId) => {
            const config = find(options.thematicLayers, ['id', dataId]);
            const data: ThematicLayerRawData[] = analytics.metaData?.dimensions?.ou?.map(ouId => {
                const values = filter(analytics.rows, (row) => row.includes(dataId) && row.includes(ouId)) as unknown as string[];
                const value = values.reduce((acc, value) => acc + parseFloat(value[valueIndex]), 0);
                return {
                    data: value,
                    dataItem: dataId,
                    orgUnit: ouId
                }
            }) ?? []
            return {
                ...config,
                data,
            } as ThematicLayerConfig
        }) ?? []
    }, [analytics]);

    return (
        <Map
            orgUnitSelection={orgUnitSelection}
            thematicLayers={thematicLayers}
        />
    )
}

export function VisualizationSelector({config, height}: VisualizationSelectorProps) {
    const [type] = useVisualizationType();
    const {analytics, loading} = useAnalyticsData();

    if (loading) {
        return (
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <CircularLoader small/>
            </div>
        )
    }
    if (!analytics) {
        return null;
    }

    return (
        <div style={{width: "100%", height: "100%"}}>
            {type === "pivot-table" && (<PivotTableRenderer options={config?.pivotTable as CustomPivotTableOptions}/>)}
            {type === "chart" && (<ChartRenderer height={height} options={config?.chart as ChartConfig}/>)}
            {type === "map" && (
                <MapRenderer options={config?.map as Omit<MapProps, "orgUnitSelection" | "periodSelection">}/>)}
        </div>
    )
}
