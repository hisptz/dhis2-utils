import type { CellContext } from "@tanstack/react-table";
import {
	ScorecardDraggableItems,
	type ScorecardTableData,
} from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import DroppableCell from "../../DroppableCell";
import { DraggableCell } from "../../DraggableCell";
import { useMemo } from "react";
import { isEmpty } from "lodash";
import { useScorecardViewStateValue } from "../../../../../utils";

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
	const dataInRows = useScorecardViewStateValue<boolean>("showDataInRows");
	const showHierarchy = useScorecardViewStateValue<boolean>("showHierarchy");

	const inPrintMode = useScorecardViewStateValue<boolean>("printMode");

	const left = useMemo(() => {
		const index = props.row
			.getVisibleCells()
			.findIndex(({ id }) => props.cell.id === id);
		return index * 48;
	}, [props.cell.id, props.row]);

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
			className="label-cell"
			fixed
			width={`${size}px`}
			style={{
				width: inPrintMode ? "auto" : size,
				minWidth: inPrintMode ? undefined : size,
			}}
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

export const LabelCell = LabelCellComponent;
