import { flexRender, type Row } from "@tanstack/react-table";
import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { DataTableRow } from "@dhis2/ui";
import styles from "../ScorecardTable.module.css";
import { ExpandedScorecardTable } from "./ExpandedScorecardTable";
import { Fragment, useMemo, useTransition } from "react";

function TableRowComponent({ row }: { row: Row<ScorecardTableData> }) {
	const [isPending, startTransition] = useTransition();
	const orgUnit = useMemo(() => {
		const dataCell = row.getVisibleCells().find((cell) => {
			const data = cell.getValue() as ScorecardTableCellConfig;
			return !!data?.orgUnit;
		});
		return (dataCell?.getValue() as ScorecardTableCellConfig)?.orgUnit;
	}, [row]);
	const canExpand = useMemo(() => {
		return row.getCanExpand();
	}, [row]);

	const expanded = row.getIsExpanded();

	return (
		<DataTableRow
			className={styles.expandCell}
			onExpandToggle={
				canExpand
					? ({ expanded }) => {
							startTransition(() => {
								row.toggleExpanded(expanded);
							});
						}
					: undefined
			}
			expandableContent={
				canExpand ? (
					<ExpandedScorecardTable
						pending={isPending}
						orgUnit={orgUnit}
					/>
				) : undefined
			}
			expanded={expanded}
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
