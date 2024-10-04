import {
	type ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	type TableOptions,
	type VisibilityState,
} from "@tanstack/react-table";
import { useTableColumns } from "./columns";
import type {
	ScorecardTableData,
	ScorecardViewOptions,
} from "../schemas/config";
import { useEffect, useMemo, useState } from "react";
import {
	type ScorecardMeta,
	useScorecardConfig,
	useScorecardMeta,
	useScorecardStateSelector,
} from "../components";
import { type AnalyticsData, getRowsFromMeta } from "../utils/data";
import { isEmpty, meanBy } from "lodash";
import type { ScorecardDataEngine } from "../utils/dataEngine";
import { getAverageValue } from "../utils/columns";
import { useScorecardData } from "../components/DataProvider";

function getRowValues({
	data,
	showDataInRows,
	row,
}: {
	row: ScorecardTableData;
	data: AnalyticsData[];
	showDataInRows: boolean;
}): AnalyticsData[] {
	return data.filter((datum) => {
		if (showDataInRows) {
			return row
				.dataHolder!.dataSources.map(({ id }) => id)
				.includes(datum.dx!);
		}
		return datum.ou === row.orgUnit!.uid;
	});
}

function filterRows({
	rows,
	emptyRows,
	dataEngine,
	showDataInRows,
	averageDisplayType,
	meta,
}: {
	emptyRows: ScorecardViewOptions["emptyRows"];
	showDataInRows: boolean;
	averageDisplayType: ScorecardViewOptions["averageDisplayType"];
	dataEngine: ScorecardDataEngine;
	rows: ScorecardTableData[];
	meta: ScorecardMeta;
}) {
	if (!dataEngine.isDone) {
		return [];
	}
	const hiddenRows: number[] = [];
	const rowsWithDataValues = rows.map((row, index) => {
		const values = getRowValues({
			row,
			data: dataEngine.data,
			showDataInRows,
		});
		const average = meanBy(values, ({ value }) => parseFloat(value!));
		return {
			row,
			index,
			values,
			average,
		};
	});
	if (!emptyRows) {
		//Filter out all e
		const emptyRows = rowsWithDataValues
			.filter(({ values }) => isEmpty(values))
			.map(({ index }) => index);
		hiddenRows.push(...emptyRows);
	}

	if (averageDisplayType !== "ALL") {
		const average = getAverageValue({
			dataValues: dataEngine.data,
			meta,
		});
		if (averageDisplayType === "BELOW_AVERAGE") {
			const aboveAverageRows = rowsWithDataValues
				.filter(({ average: rowAverage }) => rowAverage > average)
				.map(({ index }) => index);
			hiddenRows.push(...aboveAverageRows);
		} else {
			const belowAverageRows = rowsWithDataValues
				.filter(({ average: rowAverage }) => rowAverage < average)
				.map(({ index }) => index);
			hiddenRows.push(...belowAverageRows);
		}
	}

	return hiddenRows;
}

function useTableRows(): ScorecardTableData[] {
	const meta = useScorecardMeta();
	const { data: dataEngine } = useScorecardData();
	const showDataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);
	const showHierarchy = useScorecardStateSelector<boolean>([
		"options",
		"showHierarchy",
	]);
	const emptyRows = useScorecardStateSelector<boolean>([
		"options",
		"emptyRows",
	]);
	const averageDisplayType = useScorecardStateSelector<
		ScorecardViewOptions["averageDisplayType"]
	>(["options", "averageDisplayType"]);

	const config = useScorecardConfig();

	const [hiddenRowIndexes, setHiddenRowIndexes] = useState<number[]>([]);

	if (meta == null) return [];

	const rows = useMemo(() => {
		const rows = getRowsFromMeta({
			meta,
			showDataInRows,
			showHierarchy,
			config,
		});

		if (isEmpty(hiddenRowIndexes)) {
			return rows;
		}

		return rows.filter((_, index) => !hiddenRowIndexes.includes(index));
	}, [meta, showDataInRows, showHierarchy, config, hiddenRowIndexes]);

	useEffect(() => {
		const listener = (data: AnalyticsData[] | "done") => {
			if (data === "done") {
				setHiddenRowIndexes(
					filterRows({
						meta,
						dataEngine,
						showDataInRows,
						rows,
						averageDisplayType,
						emptyRows,
					}),
				);
			}
		};
		if (dataEngine.isDone) {
			setHiddenRowIndexes(
				filterRows({
					meta,
					dataEngine,
					showDataInRows,
					rows,
					averageDisplayType,
					emptyRows,
				}),
			);
		} else {
			dataEngine.addListener(listener);
		}
		return () => {
			dataEngine.removeListener(listener);
		};
	}, [averageDisplayType, emptyRows, showDataInRows]);

	return rows;
}

export function useTableSetup(): TableOptions<ScorecardTableData> {
	const showAverageColumn = useScorecardStateSelector<boolean>([
		"options",
		"averageColumn",
	]);
	const showItemNumber = useScorecardStateSelector<boolean>([
		"options",
		"itemNumber",
	]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		average: showAverageColumn,
		count: showItemNumber,
	});

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useTableColumns();
	const data = useTableRows();

	return {
		columns,
		data,
		state: {
			columnFilters,
			sorting,
			columnVisibility,
		},
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
	};
}
