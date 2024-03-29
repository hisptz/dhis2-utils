import { MapOrgUnit } from "../../../../../interfaces/index.js";

export interface EarthEngineToken {
	access_token: string;
	client_id: string;
	expires_in: number;
}

export type RefreshToken = () => Promise<{ token: EarthEngineToken }>;
export type DatasetType =
	| "Image"
	| "ImageCollection"
	| "Feature"
	| "FeatureCollection";

export interface EarthEngineOptions {
	layer: "earthEngine";
	type: DatasetType;
	id: string;
	datasetId: string;
	name: string;
	unit?: string;
	description: string;
	source: string;
	sourceUrl: string;
	img: string;
	defaultAggregations?: string[];
	maxAggregations?: number;
	periodType?: string;
	filters?: string[];
	legend?: {
		items: { id: number; name: string; color: string }[];
	};
	legacy?: boolean;
	mosaic?: boolean;
	bands?: {
		id: string;
		name: any;
		multiple?: boolean;
	}[];
	mask?: boolean;
	selectedBands?: string[];
	params?: {
		min: number;
		max: number;
		palette: string;
	};
	opacity: number;
	notice?: string;
	error?: string;
	tokenType: "Bearer";
	aggregations?: string[];
	tileScale?: number;
	methods?: Record<string, any>;
}

export interface GoogleEngineComponentProps {
	options: EarthEngineOptions;
	orgUnits: MapOrgUnit[];
}
