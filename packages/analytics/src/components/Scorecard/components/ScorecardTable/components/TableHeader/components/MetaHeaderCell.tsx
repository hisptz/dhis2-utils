import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableColumnHeader, type DataTableSortDirection } from "@dhis2/ui";
import { useScorecardStateSelector } from "../../../../StateProvider";
import i18n from "@dhis2/d2-i18n";
import styles from "../TableHeader.module.css";
import { FilterArea } from "./FilterArea";
import { uid } from "@hisptz/dhis2-utils";
import { memo, useRef } from "react";

function MetaHeaderCellComponent({
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const randomId = useRef<string>(uid());

	const hasOnePeriod = useScorecardStateSelector(["hasOnePeriod"]);
	const dataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);

	const rowSpan = dataInRows
		? hasOnePeriod
			? "2"
			: "2"
		: hasOnePeriod
			? "2"
			: "3";

	const filterColumn = header.subHeaders.find((header) =>
		header.column.getCanFilter(),
	)?.column;

	const sortDirection = !filterColumn?.getIsSorted()
		? "default"
		: (filterColumn!.getIsSorted() as DataTableSortDirection);
	const nextSortType =
		filterColumn?.getNextSortingOrder() === "asc"
			? i18n.t("in ascending order")
			: filterColumn?.getNextSortingOrder() === "desc"
				? i18n.t("in descending order")
				: i18n.t("disable");

	return (
		<DataTableColumnHeader
			key={`${header.id}-${randomId.current}`}
			align="center"
			sortIconTitle={i18n.t("Sort {{nextSortType}}", { nextSortType })}
			onSortIconClick={(_, e) => {
				const sort = filterColumn!.getToggleSortingHandler();
				if (sort) {
					sort(e);
				}
			}}
			fixed
			/*
      // @ts-ignore */
			left="0"
			sortDirection={sortDirection}
			colSpan={header.colSpan.toString()}
			rowSpan={rowSpan}
			className={styles.metaHeader}
		>
			{!!filterColumn && (
				<FilterArea
					key={`${header.id}-filter-area`}
					column={filterColumn}
				/>
			)}
		</DataTableColumnHeader>
	);
}

export const MetaHeaderCell = memo(MetaHeaderCellComponent);
