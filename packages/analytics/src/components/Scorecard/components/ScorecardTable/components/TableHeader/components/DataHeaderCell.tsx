import type { HeaderContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import { DataTableColumnHeader, type DataTableSortDirection } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { DraggableCell } from "../../DraggableCell";
import DroppableCell from "../../DroppableCell";
import { useScorecardState } from "../../../../StateProvider";

export function DataHeaderCell({
	column,
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const state = useScorecardState();

	const dataInRows = state?.options?.showDataInRows ?? false;
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
			fixed
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
