import {AnalyticsItem} from "@hisptz/dhis2-utils";

export type ToggleContextualMenuFunction = (ref: HTMLTableCellElement | null, params: { ouId?: string }) => void;

export type DHIS2Dimension = "ou" | "pe" | "dx" | "co" | string;

export interface ClippingResult {
    columns: {
        indices: number[];
        pre?: number;
        post?: number;
    };
    rows: {
        indices: number[];
        pre?: number;
        post?: number;
    }
}

export interface AxisClippingResult {
    [key: string]: any;
}


export interface PivotTableVisualization {
    showHierarchy?: boolean;
    rows: { dimension: DHIS2Dimension }[];
    filter: { dimension: DHIS2Dimension }[];
    columns: { dimension: DHIS2Dimension }[];
    colTotals?: number;
    rowTotals?: number;
    colSubTotals?: number;
    rowSubTotals?: number;
    hideEmptyColumns?: boolean;
    hideEmptyRows?: boolean;
    hideTitle?: boolean;
    title?: string;
    hideSubtitle?: boolean;
    subtitle?: string;
    fixColumnHeaders?: boolean;
    fixRowHeaders?: boolean;
    showDimensionLabels?: boolean;
}


export interface DimensionLookupItem {
    dimension: DHIS2Dimension;
    meta: AnalyticsItem;
    count?: number;
    itemIds: string[];
    items: AnalyticsItem[];
    isDxDimension: boolean;
    position: "column" | "row";
    size?: number;
}

export interface DimensionLookup {
    rows: Array<DimensionLookupItem & { position: "row" }>;
    columns: Array<DimensionLookupItem & { position: "column" }>;
    allByDimension: {
        [key: string]: DimensionLookupItem
    },
    headerDimensions: DimensionLookupItem[];
    rowHeaders: {}[];
    columnHeaders: {}[];
    dataHeaders: Record<string, number>
}


export interface PivotTableOptions {
    hideEmptyColumns: boolean,
    hideEmptyRows: boolean,
    showRowTotals: boolean,
    showColumnTotals: boolean,
    showRowSubtotals: boolean,
    showColumnSubtotals: boolean,
    fixColumnHeaders: boolean,
    fixRowHeaders: boolean,
}
