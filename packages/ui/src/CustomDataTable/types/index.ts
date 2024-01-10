import React from "react";

export interface CustomDataTableColumn {
		label: string;
		key: string;
		sortable?: boolean;
		width?: number;
}

export interface CustomDataTableRow {
		id: string;

		cellsStyle?: Record<string, any>,

		[key: string]: any;

}

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
				[key: string]: any
		};
		tableBodyProps?: Record<string, any>
		onSort?: (sortConfig: { name?: string; direction: string; }) => void;
		sortState?: { name: string; direction: "asc" | "desc" | "default" }
		pagination?: any;
		height?: number;
}
