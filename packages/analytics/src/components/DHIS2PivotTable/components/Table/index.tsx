import React from "react";
import { DataTable, DataTableProps } from "@dhis2/ui";

export type PivotTableLayoutProps = DataTableProps;

export interface PivotTableProps {
	children: React.ReactNode;
	tableProps?: DataTableProps;
	setRef?: (ref: HTMLTableElement) => void;
}

export function PivotTable({ tableProps, children, setRef }: PivotTableProps) {
	return (
		<>
			{/*
// @ts-ignore */}
			<DataTable ref={setRef as any} {...(tableProps ?? {})}>
				{children}
			</DataTable>
		</>
	);
}
