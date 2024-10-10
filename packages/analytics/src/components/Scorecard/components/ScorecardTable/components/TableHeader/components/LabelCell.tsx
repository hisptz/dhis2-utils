import type { CellContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import DroppableCell from "../../DroppableCell";
import { DraggableCell } from "../../DraggableCell";
import { useScorecardStateSelectorValue } from "../../../../../state/scorecardState";
import { memo, useMemo } from "react";
import { head, isEmpty } from "lodash";

export function LabelCellComponent(
	props: CellContext<
		ScorecardTableData,
		{
			label: string;
			orgUnit?: { uid: string; hierarchy: string; name: string };
		}
	>,
) {
	const data = props.getValue();
	const size = props.cell.column.getSize();
	const dataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);
	const showHierarchy = useScorecardStateSelectorValue<boolean>([
		"options",
		"showHierarchy",
	]);
	const itemNumber = useScorecardStateSelectorValue<boolean>([
		"options",
		"itemNumber",
	]);

	const canExpand = useMemo(() => {
		const expandCell = head(props.row.getVisibleCells());
		return (expandCell?.getValue() as boolean) ?? false;
	}, []);

	const left = useMemo(() => {
		let left = 1;
		if (itemNumber) {
			left++;
		}
		return left * 48;
	}, [canExpand, itemNumber]);

	const label = useMemo(() => {
		if (dataInRows) {
			return data.label ?? "";
		}
		if (showHierarchy) {
			return (
				data.orgUnit?.hierarchy
					.split("/")
					.filter((val) => !isEmpty(val))
					.join(" / ") ?? ""
			);
		}
		return data.label ?? "";
	}, [data, showHierarchy, dataInRows]);

	return (
		<DataTableCell
			width={`${size}px`}
			style={{
				width: size,
				minWidth: size,
			}}
			fixed
			/*
      // @ts-ignore */
			left={`${left}px`}
			bordered
			align="left"
		>
			<DroppableCell
				accept={
					dataInRows
						? [ScorecardDraggableItems.ou]
						: [ScorecardDraggableItems.data]
				}
			>
				<DraggableCell
					id={label}
					type={
						dataInRows
							? ScorecardDraggableItems.data
							: ScorecardDraggableItems.ou
					}
				>
					{label}
				</DraggableCell>
			</DroppableCell>
		</DataTableCell>
	);
}

export const LabelCell = memo(LabelCellComponent);
