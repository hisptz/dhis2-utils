import type { LegendSet } from "@hisptz/dhis2-utils";
import { Analytics, AnalyticsItem } from "@hisptz/dhis2-utils";
import { compact, findIndex, intersection, times, zip } from "lodash";
import { DHIS2Dimension } from "../interfaces";
import { getColorFromLegendSet } from "../../Map";

export interface BaseLegendConfig {
	strategy: "FIXED" | "BY_DATA_ITEM";
	showKey: boolean;
	style: "TEXT" | "FILL";
}
export interface FixedLegendConfig extends BaseLegendConfig {
	strategy: "FIXED";
	set: LegendSet;
}

export interface DataItemLegendConfig extends BaseLegendConfig {
	strategy: "BY_DATA_ITEM";
	legendMap: Map<string, LegendSet>;
}

export type LegendConfig = FixedLegendConfig | DataItemLegendConfig;

export interface EngineConfig {
	layout: {
		columns: { dimension: DHIS2Dimension; label?: string }[];
		rows: { dimension: DHIS2Dimension; label?: string }[];
		filter?: { dimension: DHIS2Dimension; label?: string }[];
	};
	options?: {
		legend?: LegendConfig;
		hideEmptyColumns?: boolean;
		hideEmptyRows?: boolean;
		showRowTotals?: boolean;
		showColumnTotals?: boolean;
		showRowSubtotals?: boolean;
		showColumnSubtotals?: boolean;
		showFilterAsTitle?: boolean;
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

	get title() {
		const filters = this.config.layout.filter ?? [];
		const labels =
			filters?.map(({ dimension }) => {
				const dimensions =
					this.analyticsData.metaData?.dimensions[dimension];

				return dimensions?.map((dimension) => {
					const dimensionItem =
						this.analyticsData.metaData?.items[dimension];
					return dimensionItem?.name;
				});
			}) ?? [];

		return compact(labels.flat()).join(", ");
	}

	get titleSpan() {
		const rowHeaders = this.rowHeaders?.length ?? 0;
		const columnHeaders =
			this.columnHeaders?.reduce(
				(acc, val) => acc + (val.items?.length ?? 0),
				0,
			) ?? 0;

		return rowHeaders + columnHeaders;
	}

	get showTitle() {
		return this.config?.options?.showFilterAsTitle;
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

	getItemValueLegend(mapper: { [key: string]: any }) {
		const legend = this.config.options?.legend;
		if (!legend) return;
		const value = this.getValue(mapper);
		const strategy = legend?.strategy;
		if (strategy === "FIXED") {
			const legends = legend.set.legends;
			const color = getColorFromLegendSet(legends, value);
			return {
				color,
				style: legend.style,
			};
		}
		if (strategy === "BY_DATA_ITEM") {
			const legendSet = legend.legendMap.get(mapper.dx);
			if (!legendSet) return;
			const legends = legendSet.legends;
			const color = getColorFromLegendSet(legends, value);
			return {
				color,
				style: legend.style,
			};
		}
		return;
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
				columns?.map((column) =>
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
