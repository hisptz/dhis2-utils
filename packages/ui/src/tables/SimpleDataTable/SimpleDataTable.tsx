import React, { ReactElement } from "react";
import {
	Checkbox,
	colors,
	DataTable,
	DataTableBody,
	DataTableCell,
	DataTableColumnHeader,
	DataTableHead,
	DataTableRow,
	DataTableToolbar,
	Pagination,
} from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { difference, isEmpty } from "lodash";
import EmptyList from "../../shared/components/EmptyList.js";
import classes from "./SimpleDataTable.module.css";
import cx from "classnames";
import { SimpleDataTableProps } from "./types";

/**
 * SimpleDataTable is a simplified abstraction of the `DataTable` from `@dhis2/ui`
 * that allows you to display a data table by passing formatted data and columns instead of child components.
 *
 * @since
 *
 * `v2.0.0`
 *
 * Features:
 *  - Empty label component
 *  - Loading status indicator
 *  - Selectable rows (external control)
 *  - Pagination (external control)
 *  - Sorting (external control)
 *
 *
 *
 */
export const SimpleDataTable: React.FC<SimpleDataTableProps> = ({
	sortState,
	rows,
	tableProps,
	emptyLabel,
	loading,
	selectedRows,
	onRowSelect,
	onRowDeselect,
	selectable,
	onSort,
	onRowClick,
	columns,
	pagination,
	tableBodyProps,
}: SimpleDataTableProps): ReactElement => {
	const rowIds = rows?.map(({ id }) => id) ?? [];
	const handleRowClick = (selectedValueId: string) => () => {
		if (onRowClick) {
			onRowClick(selectedValueId);
		}
	};
	const handleRowSelect = (id: string) => () => {
		if (selectedRows?.includes(id)) {
			if (onRowDeselect) {
				onRowDeselect([id]);
			}
		} else {
			if (onRowSelect) {
				onRowSelect([id]);
			}
		}
	};
	const onSelectAll = () => {
		if (selectedRows === undefined) {
			return;
		}
		if (isEmpty(difference(rowIds, selectedRows))) {
			if (onRowDeselect) {
				onRowDeselect(rowIds);
			}
		} else {
			if (onRowSelect) {
				onRowSelect(rowIds);
			}
		}
	};

	const allSelected =
		!isEmpty(rowIds) && isEmpty(difference(rowIds, selectedRows ?? []));
	const partiallySelected = !isEmpty(selectedRows ?? []) && !allSelected;

	if (isEmpty(rows)) {
		return <EmptyList message={emptyLabel} />;
	}

	return (
		<div>
			<DataTable
				className={cx(classes.table, {
					[classes.loading]: loading && isEmpty(rows),
				})}
				{...tableProps}
			>
				<colgroup>
					{selectable && <col width="48px" />}
					{columns?.map((col) => (
						<col
							key={`${col.key}-col-setup`}
							width={col.width ? `${col.width}%` : undefined}
						/>
					))}
				</colgroup>
				<DataTableHead>
					<DataTableRow>
						{selectable && (
							<DataTableColumnHeader
								fixed
								top={"0" as unknown as boolean}
							>
								<Checkbox
									indeterminate={partiallySelected}
									checked={allSelected}
									onChange={onSelectAll}
									value="id_1"
								/>
							</DataTableColumnHeader>
						)}
						{columns.map(({ label, key, sortable }) => (
							<DataTableColumnHeader
								name={key}
								fixed
								top={"0" as unknown as boolean} //TODO: Remove this when the issue is fixed
								sortIconTitle={
									sortable
										? i18n.t("Sort by {{column}}", {
												column: label,
											})
										: undefined
								}
								sortDirection={
									!sortable
										? undefined
										: sortState?.name === key
											? sortState.direction
											: "default"
								}
								onSortIconClick={sortable ? onSort : undefined}
								key={`${key}-column-header`}
							>
								{label}
							</DataTableColumnHeader>
						))}
					</DataTableRow>
				</DataTableHead>
				<DataTableBody
					loading={loading}
					className={cx(classes.table, {
						[classes.loading]: loading && isEmpty(rows),
					})}
					{...tableBodyProps}
				>
					{isEmpty(rows) || loading ? (
						<tr>
							<td colSpan={columns.length + (selectable ? 1 : 0)}>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: `100%`,
										overflow: "hidden",
									}}
								>
									{!loading && isEmpty(rows) && (
										<h3
											style={{
												color: colors.grey700,
											}}
										>
											{emptyLabel ??
												i18n.t(
													"There is no data for the specified filters",
												)}
										</h3>
									)}
								</div>
							</td>
						</tr>
					) : null}
					{rows?.map((data, index) => {
						const selection = !(
							data.cellsStyle?.disableSelection ?? false
						);

						return (
							<DataTableRow
								expandableContent={data.expandableContent}
								selected={selectedRows?.includes(data.id)}
								key={`${data.id}-${index}-row`}
							>
								{selectable && (
									<DataTableCell
										{...(data.cellsStyle ?? {})}
										width="48px"
									>
										{selection && (
											<Checkbox
												checked={selectedRows?.includes(
													data.id,
												)}
												onChange={handleRowSelect(
													data.id,
												)}
												value="id_1"
											/>
										)}
									</DataTableCell>
								)}
								{columns.map(({ key }) => {
									return (
										<DataTableCell
											{...(data.cellsStyle ?? {})}
											onClick={handleRowClick(data.id)}
											key={`${data.id}-${key}-cell`}
										>
											{data[key]}
										</DataTableCell>
									);
								})}
							</DataTableRow>
						);
					})}
				</DataTableBody>
			</DataTable>
			{pagination && (
				<DataTableToolbar position="bottom">
					<div style={{ width: "100%" }}>
						<Pagination {...pagination} />
					</div>
				</DataTableToolbar>
			)}
		</div>
	);
};
