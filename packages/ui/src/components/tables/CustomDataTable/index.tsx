import React from "react";
import {
    Checkbox,
    CircularLoader,
    colors,
    Cover,
    DataTable,
    DataTableBody,
    DataTableCell,
    DataTableColumnHeader,
    DataTableHead,
    DataTableRow,
    DataTableToolbar,
    Pagination
} from "@dhis2/ui"
import i18n from '@dhis2/d2-i18n';
import {difference, isEmpty} from "lodash";
import EmptyList from "./components/EmptyList";
import {Pagination as PaginationType} from "@hisptz/dhis2-utils"
import classes from "./CustomDataTable.module.css"
import {useElementSize} from "usehooks-ts";
import cx from "classnames";


export interface CustomDataTableColumn {
    label: string;
    key: string;
    sortable?: boolean;
    width?: number;
}

export interface CustomDataTableRow {
    id: string;

    [key: string]: string | number | boolean | React.ReactElement;

}

export interface CustomDataTableProps {
    columns: CustomDataTableColumn[];
    loading?: boolean;
    rows?: Array<CustomDataTableRow>;
    emptyLabel?: string | React.ReactElement;
    onRowClick?: (selectedValueId: string) => void;
    selectable?: boolean;
    selectedRows?: string[];
    onRowSelect?: (selectedValueIds: string[]) => void;
    onRowDeselect?: (selectedValueIds: string[]) => void;
    tableProps?: {
        scrollHeight?: string;
        [key: string]: any
    };
    tableBodyProps?: Record<string, any>
    onSort?: (sortConfig: { name: string; direction: string; }) => void;
    sortState?: { name: string; direction: "asc" | "desc" | "default" }
    pagination?: PaginationType;
    height?: number;
}

export const CustomDataTable: React.FC<CustomDataTableProps> = React.forwardRef(({
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
                                                                                 }: CustomDataTableProps, ref: React.ForwardedRef<CustomDataTableProps>) => {
        const [bodyRef, {height: bodyHeight}] = useElementSize();
        const rowIds = rows?.map(({id}) => id) ?? [];

        const handleRowClick = (selectedValueId: string) => () => {
            if (onRowClick) {
                onRowClick(selectedValueId);
            }
        }
        const handleRowSelect = (id: string) => () => {
            if (selectedRows?.includes(id)) {
                if (onRowDeselect) {
                    onRowDeselect([id]);
                }
            } else {
                if (onRowSelect) {
                    onRowSelect([id])
                }
            }
        }
        const onSelectAll = () => {
            if (selectedRows === undefined) {
                return;
            }
            if (isEmpty(difference(rowIds, selectedRows))) {
                if (onRowDeselect) {
                    onRowDeselect(rowIds)
                }
            } else {
                if (onRowSelect) {
                    onRowSelect(rowIds)
                }
            }
        }

        const allSelected = !isEmpty(rowIds) && isEmpty(difference(rowIds, (selectedRows ?? [])));
        const partiallySelected = !isEmpty(selectedRows ?? []) && !allSelected;


        if (isEmpty(rows)) {
            return <EmptyList/>
        }

        return (
            <>
                <DataTable className={cx(classes.table, {
                    [classes.loading]: loading && isEmpty(rows),
                })} ref={ref}  {...tableProps}>
                    <colgroup>
                        {selectable && (<col width="48px"/>)}
                        {columns?.map((col) => (
                            <col key={`${col.key}-col-setup`} width={col.width ? `${col.width}%` : undefined}/>
                        ))}
                    </colgroup>
                    <DataTableHead>
                        <DataTableRow>
                            {selectable && (<DataTableColumnHeader fixed top={"0"}>
                                <Checkbox indeterminate={partiallySelected} checked={allSelected} onChange={onSelectAll}
                                          value="id_1"/>
                            </DataTableColumnHeader>)}
                            {
                                columns.map(({label, key, sortable}) => (
                                    <DataTableColumnHeader
                                        name={key}
                                        fixed top={"0"}
                                        sortIconTitle={sortable ? i18n.t("Sort by {{column}}", {
                                            column: label
                                        }) : undefined}
                                        sortDirection={!sortable ? "default" : sortState?.name === key ? sortState.direction : "default"}
                                        onSortIconClick={sortable ? onSort : undefined}
                                        key={`${key}-column-header`}
                                    >{label}
                                    </DataTableColumnHeader>))
                            }
                        </DataTableRow>
                    </DataTableHead>
                    <DataTableBody className={cx(classes.table, {
                        [classes.loading]: loading && isEmpty(rows),
                    })} ref={bodyRef} {...tableBodyProps}>
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
                                            overflow: "hidden"
                                        }}
                                    >
                                        {loading && (
                                            <Cover className={classes["loading-cover"]} translucent>
                                                <div style={{
                                                    position: "fixed",
                                                    top: "42%",
                                                    left: "50%",
                                                    transform: "translate(50%, -50%)"
                                                }}>
                                                    <CircularLoader small/>
                                                </div>
                                            </Cover>
                                        )}

                                        {!loading && isEmpty(rows) && (
                                            <h3 style={{color: colors.grey700}}>
                                                {emptyLabel ??
                                                    i18n.t("There are no data for the specified filters")}
                                            </h3>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ) : null}
                        {
                            rows?.map((data, index) => (
                                <DataTableRow
                                    selected={selectedRows?.includes(data.id)}
                                    key={`${data.id}-${index}-row`}>
                                    {selectable && (<DataTableCell width="48px">
                                        <Checkbox checked={selectedRows?.includes(data.id)}
                                                  onChange={handleRowSelect(data.id)}
                                                  value="id_1"/>
                                    </DataTableCell>)}
                                    {
                                        columns.map(({key}) => {

                                            return (
                                                <DataTableCell onClick={handleRowClick(data.id)}
                                                               key={`${data.id}-${key}-cell`}>
                                                    {data[key]}
                                                </DataTableCell>
                                            )
                                        })
                                    }
                                </DataTableRow>
                            ))
                        }
                    </DataTableBody>
                </DataTable>
                {
                    pagination && (<DataTableToolbar position="bottom">
                        <div style={{width: "100%"}}>
                            <Pagination
                                {...pagination}
                            />
                        </div>
                    </DataTableToolbar>)
                }
            </>
        )

    }
)
