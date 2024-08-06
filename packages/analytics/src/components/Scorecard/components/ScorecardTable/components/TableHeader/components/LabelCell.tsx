import type { CellContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import DroppableCell from "../../DroppableCell";
import { DraggableCell } from "../../DraggableCell";
import { useScorecardState } from "../../../../StateProvider";

export function LabelCell(
	props: CellContext<ScorecardTableData, string | number>,
) {
	const data = props.getValue().toString();
	const state = useScorecardState();
	const dataInRows = state?.options?.showDataInRows ?? false;

	return (
		<DataTableCell
			style={{
				width: "fit-content",
				minWidth: 200,
			}}
			fixed
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
