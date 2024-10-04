import { flexRender, type Row } from "@tanstack/react-table";
import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { head } from "lodash";
import { DataTableRow } from "@dhis2/ui";
import styles from "../ScorecardTable.module.css";
import { ExpandedScorecardTable } from "./ExpandedScorecardTable";
import { Fragment, useMemo, useTransition } from "react";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

function TableRowComponent({
	row,
	virtualRow,
	virtualizer,
}: {
	row: Row<ScorecardTableData>;
	virtualRow?: VirtualItem;
	virtualizer?: Virtualizer<HTMLDivElement, any>;
}) {
	const [isPending, startTransition] = useTransition();
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

	const canExpand = orgUnit && shouldExpand;

	return (
		<DataTableRow
			data-index={virtualRow ? virtualRow.index : undefined}
			/*
      // @ts-ignore */
			ref={
				virtualizer
					? (node: any) => virtualizer.measureElement(node)
					: undefined
			}
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
				orgUnit && shouldExpand ? (
					<ExpandedScorecardTable
						pending={isPending}
						orgUnit={orgUnit}
					/>
				) : undefined
			}
			expanded={canExpand && row.getIsExpanded()}
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
