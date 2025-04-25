export interface AnalyticsHeader {
	name: string;
	valueType?: string;
	type?: string;
	hidden?: boolean;
	meta?: boolean;
}

export interface AnalyticsItem {
	[key: string]: {
		name: string;
		[key: string]: any;
	};
}

export interface AnalyticsDimension {
	dx?: string[];
	pe?: string[];
	ou?: string[];
	co?: string[];

	[key: string]: string[] | undefined;
}

export interface AnalyticsMetadata {
	ouNameHierarchy?: string;
	items: Record<string, AnalyticsItem>;
	dimensions: AnalyticsDimension;
}

export interface Analytics {
	headers?: AnalyticsHeader[];
	metaData?: AnalyticsMetadata;
	rows?: string[][];
	height?: number;
	headerWidth?: number;
	width?: number;
}
