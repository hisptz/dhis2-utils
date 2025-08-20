import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import React from "react";
import type { MapContainerProps } from "react-leaflet";
import { MapControls, MapLegendConfig } from "../components/MapArea/interfaces";
import {
	EarthEngineLayerConfig,
	ThematicLayerConfig,
} from "../components/MapLayer/interfaces";
import {
	type LeafletEventHandlerFnMap,
	type LeafletMouseEvent,
	Map as LeafletMap,
} from "leaflet";

export interface MapProviderProps {
	children: React.ReactNode;
	orgUnitSelection: OrgUnitSelection;
	periodSelection?: {
		periods?: string[];
		range?: { start: Date; end: Date };
	};
	analyticsOptions?: {
		displayProperty?: "SHORTNAME" | "NAME";
	};
}

export interface MapAnalyticsOptions {
	displayProperty?: "SHORTNAME" | "NAME";
}

export interface MapProps {
	key?: string;
	setRef?: (ref: LeafletMap) => void;
	showBaseLayer?: boolean;
	orgUnitSelection: OrgUnitSelection; //Organisation unit selection
	pointLayer?: {
		enabled: boolean;
		label?: string;
		level?: number | string;
		group?: string;
		style?: {
			icon?: string;
			groupSet?: string;
		};
		customEventHandlers?: LeafletEventHandlerFnMap;
		onLayerClick?: (
			e: LeafletMouseEvent,
			data: { orgUnit: MapOrgUnit },
		) => void;
	};
	boundaryLayer?: {
		enabled: boolean;
		customEventHandlers?: LeafletEventHandlerFnMap;
		onLayerClick?: (
			e: LeafletMouseEvent,
			data: { orgUnit: MapOrgUnit },
		) => void;
	};
	controls?: MapControls[];
	legends?: MapLegendConfig;
	thematicLayers?: ThematicLayerConfig[];
	earthEngineLayers?: EarthEngineLayerConfig[];
	showPeriodTitle?: boolean;
	periodSelection?: {
		periods?: string[];
		range?: { start: Date; end: Date };
	};
	mapOptions?: MapContainerProps;
	analyticsOptions?: MapAnalyticsOptions;
	base?: {
		url?: string;
		attribution?: string;
		enabled?: boolean;
	};
}

export interface MapOrgUnit {
	id: string;
	path: string;
	name: string;
	bounds: any[];
	geoJSON: any;
	children?: MapOrgUnit[];
	level?: number;
}

export interface PointOrgUnit {
	id: string;
	path: string;
	name: string;
	bounds: any[];
	geoJSON: any;
	icon: {
		type: "custom" | "groupIcon";
		icon: string;
	};
}
