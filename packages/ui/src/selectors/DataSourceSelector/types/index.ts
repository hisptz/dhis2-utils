import DataSource from "../models/dataSource.js";

type dataSource =
	| "indicator"
	| "programIndicator"
	| "dataSet"
	| "dataElement"
	| "customFunction"
	| "sqlView";
export type DataSourceType = {
	label: string;
	resource: string;
	type: string;
	groupResource?: string;
	dimensionItemType?: string;
	groupKey?: string;
	native?: boolean;
	filterType?: string;
	filter?: string[];
};

export type DataSourceSelectorProps = {
	dataSources?: dataSource[];
	onSelect: (data: SelectedDataItem[]) => void;
	disabled?: Array<string>;
	maxSelections?: number | string;
	selected?: SelectedDataItem[];
};

export type Pager = {
	pageCount: number;
	page: number;
	total: number;
	pageSize: number;
};

export type DataSourceResponse = {
	data: Array<{ id: string; displayName?: string; name: string }> | undefined;
	pager?: Pager;
};

export type DataSourceProps = {
	selectedDataSourceType: DataSource;
	selectedGroup?: { id: string };
	onChange: (value: Array<any>) => void;
	selected: Array<any>;
	disabled?: Array<string>;
	maxSelections?: number | string;
};

export type GroupSelectorProps = {
	selectedDataType: DataSource;
	onSelect: (value: any) => void;
	selectedGroup?: { id: string };
};

export type SelectedDataItem = {
	id: string;
	type: dataSource;
	displayName: string;

	[key: string]: unknown;
};
