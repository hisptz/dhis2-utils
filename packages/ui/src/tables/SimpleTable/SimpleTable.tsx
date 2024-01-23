import React from "react";
import { SimpleTableProps } from "./types/index.js";
import {
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableCellHead,
	TableFoot,
	TableHead,
	TableRow,
	TableRowHead,
} from "@dhis2/ui";
import { isEmpty } from "lodash";
import EmptyList from "../../shared/components/EmptyList.js";

/**
 * SimpleTable is a simplified abstraction of the `Table` from `@dhis2/ui`
 * that allows you to display a data table by passing formatted data and columns instead of child components.
 *
 * @since
 *
 * `v2.0.0`
 *
 * Features:
 *  - Empty label component
 *  - Pagination (external control)
 */
export const SimpleTable: React.FC<SimpleTableProps> = ({
	columns,
	rows,
	emptyLabel,
	tableProps,
	tableBodyProps,
	tableCellHeadProps,
	tableCellProps,
	tableRowProps,
	pagination,
}) => {
	if (isEmpty(rows)) {
		return <EmptyList message={emptyLabel} />;
	}

	return (
		<Table {...(tableProps ?? {})}>
			<TableHead>
				<TableRowHead>
					{columns.map(({ label, key, columnProps }) => (
						<TableCellHead
							{...(tableCellHeadProps ?? {})}
							{...(columnProps ?? {})}
							key={`${key}-column-header`}
						>
							{label}
						</TableCellHead>
					))}
				</TableRowHead>
			</TableHead>
			<TableBody {...(tableBodyProps ?? {})}>
				{rows?.map((row) => {
					return (
						<TableRow {...tableRowProps}>
							{columns.map(({ key }) => {
								return (
									<TableCell
										{...(tableCellProps ?? {})}
										{...(row.cellsStyle ?? {})}
										key={`${key}-${row.id}-td`}
									>
										{row[key]}
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
			</TableBody>
			{pagination && (
				<TableFoot>
					<TableRow>
						<TableCell colSpan={`${columns.length}`}>
							<Pagination {...pagination} />
						</TableCell>
					</TableRow>
				</TableFoot>
			)}
		</Table>
	);
};
