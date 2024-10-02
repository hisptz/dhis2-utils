import { flexRender, type Row } from "@tanstack/react-table";
import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { head } from "lodash";
import { DataTableRow } from "@dhis2/ui";
import styles from "../ScorecardTable.module.css";
import { ExpandedScorecardTable } from "./ExpandedScorecardTable";
import { Fragment, useMemo } from "react";

function TableRowComponent({ row }: { row: Row<ScorecardTableData> }) {
	const orgUnit = useMemo(() => {
		const dataCell = row.getVisibleCells().find((cell) => {
			const data = cell.getValue() as ScorecardTableCellConfig;
			return !!data?.orgUnit;
		});
		return (dataCell?.getValue() as ScorecardTableCellConfig)?.orgUnit;
	}, [row]);

	const shouldExpand = useMemo(() => {
		const expandCell = head(row.getVisibleCells());
		return (expandCell?.getValue() as boolean) ?? false;
	}, [row]);

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
				return (
					<Fragment key={cell.id}>
						{flexRender(
							cell.column.columnDef.cell,
							cell.getContext(),
						)}
					</Fragment>
				);
			})}
		</DataTableRow>
	);
}

export const TableRow = TableRowComponent;
