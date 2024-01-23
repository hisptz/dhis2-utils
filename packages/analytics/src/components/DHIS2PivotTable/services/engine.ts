import { Analytics, AnalyticsItem, LegendSet } from "@hisptz/dhis2-utils";
import { compact, findIndex, intersection, times, zip } from "lodash";
import { DHIS2Dimension } from "../interfaces/index.js";

export interface EngineConfig {
	layout: {
		columns: { dimension: DHIS2Dimension; label?: string }[];
		rows: { dimension: DHIS2Dimension; label?: string }[];
		filter?: { dimension: DHIS2Dimension; label?: string }[];
	};
	options?: {
		legendSets?: LegendSet[];
		hideEmptyColumns?: boolean;
		hideEmptyRows?: boolean;
		showRowTotals?: boolean;
		showColumnTotals?: boolean;
		showRowSubtotals?: boolean;
		showColumnSubtotals?: boolean;
		fixColumnHeaders?: boolean;
		fixRowHeaders?: boolean;
		[key: string]: any;
	};
}

export interface Header {
	dimension: DHIS2Dimension;
	label?: string;
	items?: AnalyticsItem[];
}

export class DHIS2PivotTableEngine {
	analyticsData: Analytics;
	valueIndex: number;
	config: EngineConfig;
	rowHeaders?: Header[];
	columnHeaders?: Header[];

	columnMap?: { [key: string]: any }[];

	constructor({
		analytics,
		config,
	}: {
		analytics: Analytics;
		config: EngineConfig;
	}) {
		this.config = config;
		this.analyticsData = analytics;
		this.valueIndex = findIndex(this.analyticsData.headers, [
			"name",
			"value",
		]);
		this.getHeaders();
		this.getColumnMap();
	}

	get fixColumnHeaders() {
		return this.config.options?.fixColumnHeaders ?? true;
	}

	get fixRowHeaders() {
		return this.config.options?.fixRowHeaders ?? true;
	}

	getDimensionItems(dimension: DHIS2Dimension) {
		return this.analyticsData.metaData?.dimensions[dimension] ?? [];
	}

	getItem(id: string) {
		return this.analyticsData.metaData?.items[id as any];
	}

	getValue(mapper: { [key: string]: any }) {
		const dimensions = Object.values(mapper);
		const data = this.analyticsData.rows?.filter(
			(row) => intersection(row, dimensions).length >= dimensions.length,
		);
		return data?.reduce((acc, row) => {
			return acc + parseFloat(row[this.valueIndex]);
		}, 0);
	}

	getHeaders() {
		this.rowHeaders = this.config.layout.rows.map((rowConfig) => {
			return {
				...rowConfig,
				items: compact(
					this.getDimensionItems(rowConfig.dimension).map(
						(itemId: string) => this.getItem(itemId),
					),
				),
			};
		});
		this.columnHeaders = this.config.layout.columns.map((columnConfig) => {
			return {
				...columnConfig,
				items: compact(
					this.getDimensionItems(columnConfig.dimension).map(
						(itemId: string) => this.getItem(itemId),
					),
				),
			};
		});
	}

	getColumnMap() {
		const columns = this.columnHeaders;
		const sanitizedColumns =
			compact(
				columns?.map(
					(column) =>
						column.items?.map((item) => ({
							[column.dimension]: item.uid,
						})),
				),
			) ?? [];
		const size = sanitizedColumns.reduce((acc, items) => {
			return acc * (items?.length ?? 1);
		}, 1);
		const standardiseColumns = sanitizedColumns.map((items) => [
			...times(size / items.length, () => items).flat(),
		]);
		this.columnMap = compact(
			zip(...standardiseColumns).map((arr) =>
				arr.reduce((obj, value) => {
					return { ...obj, ...value };
				}),
			),
		);
	}
}
