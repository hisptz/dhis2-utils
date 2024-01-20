import React from "react";
import { DataTable, DataTableProps } from "@dhis2/ui";

export type PivotTableLayoutProps = DataTableProps;

export interface PivotTableProps {
	children: React.ReactNode;
	tableProps?: DataTableProps;
}

export function PivotTable({ tableProps, children }: PivotTableProps) {
	return <DataTable {...(tableProps ?? {})}>{children}</DataTable>;
}
