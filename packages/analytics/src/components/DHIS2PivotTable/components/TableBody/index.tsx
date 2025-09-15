import { Header } from "../../services/engine";
import { isEmpty, slice } from "lodash";
import { useCustomPivotTableEngine } from "../../state/engine.js";
import { DataTableCell, DataTableRow, TableBody } from "@dhis2/ui";
import { Fragment, type ReactElement, ReactNode, useRef } from "react";
import { AnalyticsItem } from "@hisptz/dhis2-utils";
import classes from "./TableBody.module.css";
import { DHIS2Dimension } from "../../interfaces";
import { useResizeObserver } from "usehooks-ts";
import { getTextColorFromBackgroundColor } from "../../utils/color";

function DataRowRenderer({
	mapper,
	item,
	dimension,
}: {
	mapper?: { [key: string]: any };
	item: AnalyticsItem;
	dimension: DHIS2Dimension;
}) {
	const engine = useCustomPivotTableEngine();

	const columnMappers = engine?.columnMap;
	const completeMapper = columnMappers?.map((map) => ({
		...map,
		...mapper,
		[dimension]: item.uid,
	}));

	return (
		<>
			{completeMapper?.map((mapper) => {
				const legend = engine?.getItemValueLegend(mapper);

				return (
					<DataTableCell
						style={{
							background:
								legend?.style === "FILL"
									? legend?.color
									: undefined,
							color:
								legend?.style === "FILL"
									? getTextColorFromBackgroundColor(
											legend?.color,
										)
									: legend?.style === "TEXT"
										? legend.color
										: undefined,
						}}
						key={`${Object.values(mapper).join("-")}-value`}
						align="center"
						bordered
					>
						{engine?.getValue(mapper) ?? ""}
					</DataTableCell>
				);
			})}
		</>
	);
}

function RowRenderer({
	row,
	index,
	config: { rows, columns, mapper, prevWidth, fixRowHeaders },
}: {
	row: Header;
	index: number;
	config: {
		rows: Header[];
		columns?: Header[];
		mapper?: { [key: string]: string | undefined };
		prevWidth?: number;
		fixRowHeaders?: boolean;
	};
}): ReactElement | null {
	const cellRef = useRef<HTMLElement | null>(null);
	const { width } = useResizeObserver({
		ref: cellRef,
	});

	const rowSpan = slice(rows, index + 1).reduce((acc, column) => {
		return acc * (column.items?.length ?? 1);
	}, 1);
	const hasSubRows = !isEmpty(rows[index + 1]);
	const nextRow = rows[index + 1];

	return (
		<>
			{row?.items?.map((item) => {
				return (
					<Fragment key={`${item.name}-${row.dimension}-fragment`}>
						<DataTableRow key={`${item.name}-${row.dimension}-row`}>
							<DataTableCell
								/*
      // @ts-ignore */
								ref={cellRef}
								fixed={fixRowHeaders}
								left={`${prevWidth}px` as unknown as boolean}
								className={classes["header-cell"]}
								tag="th"
								bordered
								rowSpan={(
									rowSpan + (hasSubRows ? 1 : 0)
								).toString()}
							>
								{item.name as unknown as string | ReactNode}
							</DataTableCell>
							{!hasSubRows ? (
								<DataRowRenderer
									dimension={row.dimension}
									mapper={mapper}
									item={item}
								/>
							) : null}
						</DataTableRow>
						{hasSubRows ? (
							<RowRenderer
								row={nextRow}
								index={index + 1}
								config={{
									rows,
									columns,
									prevWidth: width,
									mapper: {
										...mapper,
										[row.dimension]:
											item.uid as unknown as string,
									},
								}}
							/>
						) : null}
					</Fragment>
				);
			})}
		</>
	);
}

export function CustomPivotTableBody() {
	const engine = useCustomPivotTableEngine();
	const rows = engine?.rowHeaders;
	const columns = engine?.columnHeaders;
	const fixRowHeaders = engine?.fixRowHeaders;

	if (!rows || isEmpty(rows)) {
		return null;
	}

	return (
		<TableBody>
			<RowRenderer
				row={rows[0]}
				index={0}
				config={{ rows, columns, fixRowHeaders }}
			/>
		</TableBody>
	);
}
