import type { OrgUnitSelection } from "@hisptz/dhis2-utils";
import React from "react";
import type { MapContainerProps } from "react-leaflet";
import {
	MapControls,
	MapLegendConfig,
} from "../components/MapArea/interfaces/index.js";
import {
	EarthEngineLayerConfig,
	ThematicLayerConfig,
} from "../components/MapLayer/interfaces/index.js";
import type { LeafletEventHandlerFnMap, LeafletMouseEvent } from "leaflet";

export interface MapProviderProps {
	children: React.ReactNode;
	orgUnitSelection: OrgUnitSelection;
	periodSelection?: {
		periods?: string[];
		range?: { start: Date; end: Date };
	};
}

export interface MapProps {
	key?: string;
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
	periodSelection?: {
		periods?: string[];
		range?: { start: Date; end: Date };
	};
	mapOptions?: MapContainerProps;
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
