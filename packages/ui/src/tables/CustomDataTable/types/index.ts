import React from "react";

/**
 * Represents a column in a custom data table.
 * @interface
 */
export interface CustomDataTableColumn {
	/**
	 * Represents a label.
	 *
	 * @typedef {string} Label
	 */
	label: string;
	/**
	 * Represents a variable key.
	 *
	 * @typedef {string} Key
	 */
	key: string;
	/**
	 * Indicates whether the variable is sortable or not.
	 *
	 * @type {boolean}
	 * @since 1.0.0
	 */
	sortable?: boolean;
	/**
	 * Represents the width of something.
	 *
	 * @typedef {number} Width
	 */
	width?: number;
}

/**
 * Represents a custom data table row.
 * @interface
 */
export interface CustomDataTableRow {
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
	cellsStyle?: Record<string, any>;

	[key: string]: any;
}

/**
 * CustomDataTableProps interface represents the props for the CustomDataTable component.
 *
 * @interface CustomDataTableProps
 * @property {CustomDataTableColumn[]} columns - The array of columns for the data table.
 * @property {boolean} [loading] - Indicates if the data table is in a loading state.
 * @property {CustomDataTableRow[]} [rows] - The array of rows for the data table.
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
export interface CustomDataTableProps {
	columns: CustomDataTableColumn[];
	loading?: boolean;
	rows?: Array<CustomDataTableRow>;
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
	onSort?: (sortConfig: {
		/**
		 * Represents the name of a variable.
		 *
		 * @typedef {string} Name
		 */
		name?: string;
		direction: string;
	}) => void;
	sortState?: { name: string; direction: "asc" | "desc" | "default" };
	pagination?: any;
	height?: number;
}
