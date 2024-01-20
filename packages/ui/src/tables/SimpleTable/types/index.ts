import React from "react";
import {
	TableBodyProps,
	TableCellHeadProps,
	TableCellProps,
	TableProps,
	TableRowProps,
} from "@dhis2/ui";

export interface SimpleTableColumn {
	key: string;
	label: string;
	columnProps?: TableCellHeadProps;
}

export interface SimpleTableRow {
	id: string;
	cellProps?: TableCellProps;

	[key: string]: any;
}

export interface SimpleTablePagination {
	page: number;
	pageSize: number;
	total: number;
	pageCount: number;

	onPageChange(page: number): void;

	onPageSizeChange(pageSize: number): void;
}

export interface SimpleTableProps {
	columns: SimpleTableColumn[];
	rows?: SimpleTableRow[];
	emptyLabel?: string | React.ReactElement;
	tableProps?: TableProps;
	tableRowProps?: TableRowProps;
	tableBodyProps?: TableBodyProps;
	tableCellProps?: TableCellProps;
	tableCellHeadProps?: TableCellHeadProps;
	pagination?: SimpleTablePagination;
}
