import {Header} from "../../services/engine";
import {isEmpty, slice} from "lodash";
import {useCustomPivotTableEngine} from "../../state/engine";
import {DataTableCell, DataTableRow, TableBody} from '@dhis2/ui'
import React, {Fragment} from "react";
import {AnalyticsItem} from "@hisptz/dhis2-utils";
import {DHIS2Dimension} from "../../../PivotTable";
import classes from "./TableBody.module.css"

function DataRowRenderer({
                             mapper,
                             item,
                             dimension
                         }: { mapper: { [key: string]: any }; item: AnalyticsItem, dimension: DHIS2Dimension }) {
    const engine = useCustomPivotTableEngine();

    const columnMappers = engine?.columnMap;
    const completeMapper = columnMappers?.map((map) => ({...map, ...mapper, [dimension]: item.uid}));
    return <>
        {
            completeMapper?.map((mapper) => (
                <DataTableCell key={`${Object.values(mapper).join('-')}-value`} align="center" bordered>
                    {engine?.getValue(mapper) ?? ''}
                </DataTableCell>
            ))
        }
    </>;
}

function renderRows(row: Header, index: number, {
    rows,
    columns,
    mapper = {}
}: { rows: Header[], columns?: Header[]; mapper: { [key: string]: string | undefined } }): React.ReactNode | null {

    const rowSpan = slice(rows, index + 1).reduce((acc, column) => {
        return acc * (column.items?.length ?? 1);
    }, 1)
    const hasSubRows = !isEmpty(rows[index + 1]);
    const nextRow = rows[index + 1];

    return (
        <>

            {
                row?.items?.map((item) => {
                    return (
                        <Fragment key={`${item.name}-${row.dimension}-fragment`}>
                            <DataTableRow key={`${item.name}-${row.dimension}-row`}>
                                <DataTableCell className={classes['header-cell']} tag="th" bordered
                                               rowSpan={(rowSpan + (hasSubRows ? 1 : 0)).toString()}>
                                    {item.name}
                                </DataTableCell>
                                {
                                    !hasSubRows ?
                                        <DataRowRenderer dimension={row.dimension} mapper={mapper} item={item}/> : null
                                }
                            </DataTableRow>
                            {
                                hasSubRows ? (renderRows(nextRow, index + 1, {
                                    rows,
                                    columns,
                                    mapper: {...mapper, [row.dimension]: item.uid as unknown as string}
                                })) : null
                            }
                        </Fragment>
                    )
                })
            }
        </>
    )


}


export function CustomPivotTableBody() {
    const engine = useCustomPivotTableEngine();
    const rows = engine?.rowHeaders;
    const columns = engine?.columnHeaders;

    if (!rows || isEmpty(rows)) {
        return null;
    }

    return (
        <TableBody>
            {
                renderRows(rows[0], 0, {rows, columns, mapper: {}})
            }
        </TableBody>
    )
}
