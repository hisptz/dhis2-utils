import { DataTableBody, DataTableRow } from "@dhis2/ui";
import { useTableState } from "../../TableStateProvider";
import { flexRender, type Row } from "@tanstack/react-table";
import type {
	ScorecardTableCellData,
	ScorecardTableData,
} from "../../../schemas/config";
import { ExpandedScorecardTable } from "./ExpandedScorecardTable";
import { head } from "lodash";
import styles from "../ScorecardTable.module.css";

function TableRow({ row }: { row: Row<ScorecardTableData> }) {
	const dataCell = row.getVisibleCells().find((cell) => {
		const data = cell.getValue() as ScorecardTableCellData;
		return !!data?.orgUnit;
	});

	const expandCell = head(row.getVisibleCells());

	const shouldExpand = (expandCell?.getValue() as boolean) ?? false;

	const orgUnit = (dataCell?.getValue() as ScorecardTableCellData)?.orgUnit;

	return (
		<DataTableRow
			className={styles.expandCell}
			onExpandToggle={({ expanded }) => {
				row.toggleExpanded(expanded);
			}}
			expandableContent={
				orgUnit && shouldExpand ? (
					<ExpandedScorecardTable orgUnit={orgUnit} />
				) : null
			}
			expanded={row.getIsExpanded()}
			key={row.id}
		>
			{row.getVisibleCells().map((cell) => {
				return flexRender(
					cell.column.columnDef.cell,
					cell.getContext(),
				);
			})}
		</DataTableRow>
	);
}

export function TableBody() {
	const table = useTableState();
	return (
		<DataTableBody>
			{table.getRowModel().rows.map((row) => (
				<TableRow key={row.id} row={row} />
			))}
		</DataTableBody>
	);
}
