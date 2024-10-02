import React from "react";
import { DataTableSortDirection } from "@dhis2/ui";

/**
 * Represents a column in a custom data table.
 * @interface
 */
export interface SimpleDataTableColumn {
	/** Label of the column that should be displayed  @typedef {string}  */
	label: string;
	/** A reference of data in a row to be displayed on this column     */
	key: string;
	/** Controls if the column header should show the sort UI  */
	sortable?: boolean;
	/** Width of the column */
	width?: number;
}

/**
 * Represents a custom data table row.
 * @interface
 */
export interface SimpleDataTableRow {
	/**
	 * Represents a unique identifier.
	 * @typedef {string} Id
	 */
	id: string;

	/**
	 * Represents the style configuration for cells.
	 *
	 * @typedef {Record<string, any>} CellsStyle
	 * @property {any} [property1] - The value for property1.
	 * @property {any} [property2] - The value for property2.
	 * @property {any} [property3] - The value for property3.
	 * ...
	 * @property {any} [propertyN] - The value for propertyN.
	 */
	cellsStyle?: {
		tag?: "td" | "th";
		active?: boolean;
		disableSelection?: boolean;
		onClick?: () => void;
		align?: "right" | "center" | "left";
		error?: boolean;
		valid?: boolean;
		muted?: boolean;
		backgroundColor?: string;
	};

	[key: string]: any;
}

export interface SimpleDataTableSortState {
	name?: string;
	direction: DataTableSortDirection;
}

/**
 * SimpleDataTableProps interface represents the props for the SimpleDataTable component.
 *
 * @interface SimpleDataTableProps
 * @property {SimpleDataTableColumn[]} columns - The array of columns for the data table.
 * @property {boolean} [loading] - Indicates if the data table is in a loading state.
 * @property {SimpleDataTableRow[]} [rows] - The array of rows for the data table.
 * @property {string | React.ReactElement} [emptyLabel] - The label to display when there are no rows in the data table.
 * @property {(selectedValueId: string) => void} [onRowClick] - The callback function to handle row clicks.
 * @property {boolean} [selectable] - Indicates if the rows in the data table are selectable.
 * @property {string[]} [selectedRows] - The array of selected row IDs in the data table.
 * @property {(selectedValueIds: string[]) => void} [onRowSelect] - The callback function to handle row selection.
 * @property {(selectedValueIds: string[]) => void} [onRowDeselect] - The callback function to handle row deselection.
 * @property {{ scrollHeight?: string; [key: string]: any }} [tableProps] - Additional props to pass to the table element.
 * @property {Record<string, any>} [tableBodyProps] - Additional props to pass to the table body element.
 * @property {({ name?: string; direction: string; }) => void} [onSort] - The callback function to handle sort actions.
 * @property {{ name: string; direction: "asc" | "desc" | "default" }} [sortState] - The current sort state of the data table.
 * @property {any} [pagination] - The pagination configuration for the data table.
 * @property {number} [height] - The height of the data table.
 */
export interface SimpleDataTableProps {
	columns: SimpleDataTableColumn[];
	loading?: boolean;
	rows?: Array<SimpleDataTableRow>;
	emptyLabel?: string | React.ReactElement;
	onRowClick?: (selectedValueId: string) => void;
	selectable?: boolean;
	selectedRows?: string[];
	onRowSelect?: (selectedValueIds: string[]) => void;
	onRowDeselect?: (selectedValueIds: string[]) => void;
	tableProps?: {
		scrollHeight?: string;
		[key: string]: any;
	};
	tableBodyProps?: Record<string, any>;
	onSort?: (sortConfig: SimpleDataTableSortState) => void;
	sortState?: SimpleDataTableSortState;
	pagination?: SimpleDataTablePagination;
	height?: number;
}

export interface SimpleDataTablePagination {
	page: number;
	pageSize: number;
	total: number;
	pageCount: number;

	onPageChange(page: number): void;

	onPageSizeChange(pageSize: number): void;
}
