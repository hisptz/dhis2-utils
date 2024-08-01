import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableColumnHeader, type DataTableSortDirection } from "@dhis2/ui";
import { useScorecardState } from "../../../../StateProvider";
import i18n from "@dhis2/d2-i18n";
import styles from "../TableHeader.module.css";
import { FilterArea } from "./FilterArea";

export function MetaHeaderCell({
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const state = useScorecardState();
	const hasOnePeriod = state?.hasOnePeriod ?? false;
	const dataInRows = state?.options?.showDataInRows ?? false;

	const rowSpan = dataInRows ? (hasOnePeriod ? "1" : "2") : "3";

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
			key={header.id}
			align="right"
			onFilterIconClick={() => {}}
			sortIconTitle={i18n.t("Sort {{nextSortType}}", { nextSortType })}
			onSortIconClick={({ direction }, e) => {
				const sort = filterColumn!.getToggleSortingHandler();
				if (sort) {
					sort(e);
				}
			}}
			sortDirection={sortDirection}
			fixed
			colSpan={header.colSpan.toString()}
			rowSpan={rowSpan}
			className={styles.metaHeader}
		>
			{!!filterColumn && <FilterArea column={filterColumn} />}
		</DataTableColumnHeader>
	);
}
