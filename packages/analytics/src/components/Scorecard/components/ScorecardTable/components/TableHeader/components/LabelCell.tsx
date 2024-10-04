import type { CellContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import DroppableCell from "../../DroppableCell";
import { DraggableCell } from "../../DraggableCell";
import { useScorecardStateSelector } from "../../../../StateProvider";
import { memo, useMemo } from "react";
import { head } from "lodash";

export function LabelCellComponent(
	props: CellContext<ScorecardTableData, string | number>,
) {
	const data = props.getValue().toString();
	const dataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);

	const itemNumber = useScorecardStateSelector<boolean>([
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

	return (
		<DataTableCell
			style={{
				width: "fit-content",
				minWidth: 300,
			}}
			fixed
			/*
      // @ts-ignore */
			left={`${left}px`}
			bordered
		>
			<DroppableCell
				accept={
					dataInRows
						? [ScorecardDraggableItems.ou]
						: [ScorecardDraggableItems.data]
				}
			>
				<DraggableCell
					type={
						dataInRows
							? ScorecardDraggableItems.data
							: ScorecardDraggableItems.ou
					}
				>
					{data}
				</DraggableCell>
			</DroppableCell>
		</DataTableCell>
	);
}

export const LabelCell = memo(LabelCellComponent);
