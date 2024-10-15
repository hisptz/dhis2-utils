import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import { memo, useMemo } from "react";

function NumberCellComponent(
	props: CellContext<ScorecardTableData, string | number>,
) {
	const data = props.getValue().toString();
	const size = props.cell.column.getSize();

	const left = useMemo(() => {
		const index = props.row
			.getVisibleCells()
			.findIndex(({ id }) => props.cell.id === id);
		return index * size;
	}, [props.row, size]);

	return (
		<DataTableCell
			bordered
			width={`${size}px`}
			style={{
				width: size,
				minWidth: size,
				maxWidth: 48,
				height: 48,
			}}
			fixed
			/*
      // @ts-ignore */
			left={`${left}px`}
		>
			{data}
		</DataTableCell>
	);
}

export const NumberCell = memo(NumberCellComponent);
