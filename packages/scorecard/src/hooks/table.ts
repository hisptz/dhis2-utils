import {
	type ColumnFiltersState,
	type ExpandedState,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type Row,
	type SortingState,
	type TableOptions,
	type VisibilityState,
} from "@tanstack/react-table";
import { useTableColumns } from "./columns";
import type {
	ScorecardTableData,
	ScorecardViewOptions,
} from "../schemas/config";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	type ScorecardMeta,
	useScorecardConfig,
	useScorecardMeta,
} from "../components";
import { type AnalyticsData, getRowsFromMeta } from "../utils/data";
import { isEmpty, meanBy } from "lodash";
import type { ScorecardDataEngine } from "../utils/dataEngine";
import { getAverageValue } from "../utils/columns";
import { useScorecardData } from "../components/DataProvider";
import { useScorecardStateSelectorValue } from "../state/scorecardState";

export function getRowValues({
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

export function filterRows({
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

export function useTableRows(): ScorecardTableData[] {
	const meta = useScorecardMeta();
	const { data: dataEngine } = useScorecardData();
	const showDataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);
	const emptyRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"emptyRows",
	]);
	const averageDisplayType = useScorecardStateSelectorValue<
		ScorecardViewOptions["averageDisplayType"]
	>(["options", "averageDisplayType"]);

	const config = useScorecardConfig();

	const [hiddenRowIndexes, setHiddenRowIndexes] = useState<number[]>([]);

	if (meta == null) return [];

	const rows = useMemo(() => {
		const rows = getRowsFromMeta({
			meta,
			showDataInRows,
			config,
		});

		if (isEmpty(hiddenRowIndexes)) {
			return rows;
		}

		return rows.filter((_, index) => !hiddenRowIndexes.includes(index));
	}, [meta, showDataInRows, config, hiddenRowIndexes]);

	useEffect(() => {
		const listener = (completed: boolean) => {
			if (completed) {
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
			return dataEngine.addOnCompleteListener(listener);
		}
	}, [averageDisplayType, emptyRows, showDataInRows]);

	return rows;
}

export function useColumnVisibility() {
	const showAverageColumn = useScorecardStateSelectorValue<boolean>([
		"options",
		"averageColumn",
	]);
	const showItemNumber = useScorecardStateSelectorValue<boolean>([
		"options",
		"itemNumber",
	]);
	const showDataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);

	const disableExpanding =
		useScorecardStateSelectorValue<boolean>([
			"options",
			"disableExpanding",
		]) ?? false;

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		average: showAverageColumn,
		count: showItemNumber,
		expand: !disableExpanding,
	});

	useEffect(() => {
		setColumnVisibility({
			average: showAverageColumn,
			count: showItemNumber,
			expand: !disableExpanding && !showDataInRows,
		});
	}, [showAverageColumn, showItemNumber, disableExpanding, showDataInRows]);

	return {
		columnVisibility,
		setColumnVisibility,
	};
}

export function useRowExpanding() {
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const disableExpanding =
		useScorecardStateSelectorValue<boolean>([
			"options",
			"disableExpanding",
		]) ?? false;

	const getRowCanExpand = useCallback((row: Row<ScorecardTableData>) => {
		const expandCell = row
			.getVisibleCells()
			.find(({ id }) => id.includes("expand"));

		if (!expandCell) return false;
		return expandCell.getValue() as boolean;
	}, []);

	return {
		expanded,
		onExpandedChange: disableExpanding ? undefined : setExpanded,
		getRowCanExpand,
	};
}

export function useTableSetup(): TableOptions<ScorecardTableData> {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const disablePagination = useScorecardStateSelectorValue<boolean>([
		"options",
		"disablePagination",
	]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageSize: 50,
		pageIndex: 0,
	});

	const { columnVisibility, setColumnVisibility } = useColumnVisibility();
	const { expanded, onExpandedChange, getRowCanExpand } = useRowExpanding();

	const [sorting, setSorting] = useState<SortingState>([]);
	const columns = useTableColumns();
	const data = useTableRows();

	return useMemo(
		() => ({
			columns,
			data,
			state: {
				columnFilters,
				sorting,
				columnVisibility,
				expanded,
				...(disablePagination ? {} : { pagination }),
			},
			meta: {
				disablePagination,
			},
			autoResetPageIndex: true,
			onExpandedChange: onExpandedChange,
			rowCount: data.length,
			getRowCanExpand,
			onColumnFiltersChange: setColumnFilters,
			onSortingChange: setSorting,
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			getExpandedRowModel: getExpandedRowModel(),
			getPaginationRowModel: disablePagination
				? undefined
				: getPaginationRowModel(),
			getSortedRowModel: getSortedRowModel(),
			onColumnVisibilityChange: setColumnVisibility,
			onPaginationChange: disablePagination ? undefined : setPagination,
		}),
		[
			columns,
			data,
			columnFilters,
			sorting,
			columnVisibility,
			pagination,
			getRowCanExpand,
			expanded,
		],
	);
}
