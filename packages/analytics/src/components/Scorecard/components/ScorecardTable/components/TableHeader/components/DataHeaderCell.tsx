import type { HeaderContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import { DataTableColumnHeader, type DataTableSortDirection } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { DraggableCell } from "../../DraggableCell";
import DroppableCell from "../../DroppableCell";
import { useScorecardStateSelectorValue } from "../../../../../state/scorecardState";

export function EmptyDataHeaderCell({
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const colSpan = header.colSpan.toString();
	return <DataTableColumnHeader colSpan={colSpan} />;
}

export function DataHeaderCellComponent({
	column,
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const dataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);
	const label =
		(header.column.columnDef.meta as { label: string }).label ??
		(column.columnDef.meta as { label: string }).label;

	const bold =
		(header.column.columnDef.meta as { bold?: boolean }).bold ??
		(column.columnDef.meta as { bold?: boolean }).bold;

	const colSpan = header.colSpan.toString();

	const sortDirection = !column?.getIsSorted()
		? "default"
		: (column!.getIsSorted() as DataTableSortDirection);
	const nextSortType =
		column?.getNextSortingOrder() === "asc"
			? i18n.t("in ascending order")
			: column?.getNextSortingOrder() === "desc"
				? i18n.t("in descending order")
				: i18n.t("disable");

	return (
		<DataTableColumnHeader
			key={`${label}`}
			sortIconTitle={i18n.t("Sort {{nextSortType}}", { nextSortType })}
			onSortIconClick={
				header.column?.getCanSort() || column.getCanSort()
					? (_, e) => {
							const sort = column!.getToggleSortingHandler();
							if (sort) {
								sort(e);
							}
						}
					: undefined
			}
			sortDirection={
				header.column?.getCanSort() || column.getCanSort()
					? sortDirection
					: undefined
			}
			align="center"
			colSpan={colSpan}
		>
			<DroppableCell
				accept={
					dataInRows
						? [ScorecardDraggableItems.data]
						: [ScorecardDraggableItems.ou]
				}
			>
				<DraggableCell
					id={label}
					type={
						dataInRows
							? ScorecardDraggableItems.ou
							: ScorecardDraggableItems.data
					}
				>
					{bold ? <b>{label}</b> : label}
				</DraggableCell>
			</DroppableCell>
		</DataTableColumnHeader>
	);
}

export const DataHeaderCell = DataHeaderCellComponent;
