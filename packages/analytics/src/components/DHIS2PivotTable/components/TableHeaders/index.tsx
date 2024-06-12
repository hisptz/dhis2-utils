import React from "react";
import { useCustomPivotTableEngine } from "../../state/engine.js";
import { DataTableColumnHeader, DataTableRow, TableHead } from "@dhis2/ui";
import { isEmpty, slice, times } from "lodash";
import { DHIS2PivotTableEngine, Header } from "../../services/engine.js";
import classes from "./TableHeaders.module.css";
import { useElementSize } from "usehooks-ts";

function ColumnRenderer({
	column,
	index,
	config: { fixColumnHeaders, rowHeaders, prevHeight = 0, columns, engine },
}: {
	column: Header;
	index: number;
	config: {
		columns: Header[];
		rowHeaders?: Header[];
		prevHeight?: number;
		fixColumnHeaders?: boolean;
		engine: DHIS2PivotTableEngine;
	};
}): React.ReactElement | null {
	const [columnHeaderRef, { height }] = useElementSize();

	if (!column) {
		return null;
	}
	const colSpan = slice(columns, index + 1).reduce((acc, column) => {
		return acc * (column.items?.length ?? 1);
	}, 1);

	const hasSubColumns = !isEmpty(columns[index + 1]);
	const nextColumn = columns[index + 1];

	const multiplicationFactor = slice(columns, 0, index).reduce(
		(acc, column) => {
			return acc * (column.items?.length ?? 1);
		},
		1,
	);

	return (
		<>
			{engine?.showTitle && (
				<DataTableRow>
					<DataTableColumnHeader
						align="center"
						colSpan={engine.titleSpan.toString()}
					>
						{engine.title ?? ""}
					</DataTableColumnHeader>
				</DataTableRow>
			)}
			<DataTableRow>
				{index === 0 &&
					rowHeaders?.map((header) => {
						return (
							<DataTableColumnHeader
								fixed={fixColumnHeaders}
								/*
      // @ts-ignore */
								top={"0"}
								className={classes["table-header"]}
								rowSpan={columns.length.toString()}
								key={`${header.dimension}-header-column`}
							>
								{header.label ?? ""}
							</DataTableColumnHeader>
						);
					})}
				{times(multiplicationFactor, (colNo) => {
					return column.items?.map((item) => (
						<DataTableColumnHeader
							fixed={fixColumnHeaders}
							/*
      // @ts-ignore */
							top={`${prevHeight.toString()}px`}
							ref={index === 0 ? columnHeaderRef : undefined}
							className={classes["table-header"]}
							align="center"
							colSpan={colSpan.toString()}
							key={`${colNo}-${item.name}-column-header`}
						>
							{item.name as unknown as string}
						</DataTableColumnHeader>
					));
				})}
			</DataTableRow>
			{hasSubColumns ? (
				<ColumnRenderer
					column={nextColumn}
					index={index + 1}
					config={{
						columns,
						rowHeaders,
						prevHeight: height,
						fixColumnHeaders,
					}}
				/>
			) : null}
		</>
	);
}

export function TableHeaders() {
	const engine = useCustomPivotTableEngine();
	const columns = engine?.columnHeaders;
	const rowHeaders = engine?.rowHeaders;
	const fixColumnHeaders = engine?.fixColumnHeaders;

	if (!columns || isEmpty(columns)) {
		return null;
	}

	return (
		<TableHead>
			<ColumnRenderer
				column={columns[0]}
				index={0}
				config={{ engine, rowHeaders, columns, fixColumnHeaders }}
			/>
		</TableHead>
	);
}
