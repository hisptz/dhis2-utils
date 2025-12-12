import type { HeaderContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardLegend,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import {
	DataTableColumnHeader,
	type DataTableSortDirection,
	Tooltip,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { DraggableCell } from "../../DraggableCell";
import DroppableCell from "../../DroppableCell";
import { useScorecardViewStateValue } from "../../../../../utils";
import { useBoolean } from "usehooks-ts";
import { useRef } from "react";
import { DataHeaderLegendView } from "./DataHeaderLegendView";
import { isEmpty } from "lodash";

export function EmptyDataHeaderCell({
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const colSpan = header.colSpan.toString();
	return <DataTableColumnHeader colSpan={colSpan} />;
}

function SpecificTargetsIndicator({
	legends,
}: {
	legends?: Array<{ specificTargetsSet?: boolean | undefined }>;
}) {
	const hasSpecificTargets = legends?.some(
		({ specificTargetsSet }) => specificTargetsSet === true,
	);
	return hasSpecificTargets ? (
		<Tooltip
			content={i18n.t("This data item has specific targets configured")}
		>
			*
		</Tooltip>
	) : null;
}

export function DataHeaderCellComponent({
	column,
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const dataInRows = useScorecardViewStateValue<boolean>("showDataInRows");
	const labelRef = useRef<HTMLElement>(null);
	const label =
		(
			header.column.columnDef.meta as {
				label: string;
				legends: { id: string };
			}
		).label ?? (column.columnDef.meta as { label: string }).label;

	const bold =
		(header.column.columnDef.meta as { bold?: boolean }).bold ??
		(column.columnDef.meta as { bold?: boolean }).bold;

	const colSpan = header.colSpan.toString();
	const { value: openLegendView, toggle: toggleLegendView } =
		useBoolean(false);

	const sortDirection = !column?.getIsSorted()
		? "default"
		: (column!.getIsSorted() as DataTableSortDirection);
	const nextSortType =
		column?.getNextSortingOrder() === "asc"
			? i18n.t("in ascending order")
			: column?.getNextSortingOrder() === "desc"
				? i18n.t("in descending order")
				: i18n.t("disable");

	const legends = (
		header.column.columnDef.meta as {
			legends: Array<{
				id: string;
				label: string;
				legends: ScorecardLegend[];
				specificTargetsSet?: boolean;
			}>;
		}
	)?.legends;

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
					{openLegendView && !isEmpty(legends) && (
						<DataHeaderLegendView
							legends={legends}
							reference={labelRef}
							onClose={toggleLegendView}
						/>
					)}
					{bold ? (
						<b>{label}</b>
					) : (
						<span onClick={toggleLegendView} ref={labelRef}>
							{label}{" "}
							<SpecificTargetsIndicator legends={legends} />
						</span>
					)}
				</DraggableCell>
			</DroppableCell>
		</DataTableColumnHeader>
	);
}

export const DataHeaderCell = DataHeaderCellComponent;
