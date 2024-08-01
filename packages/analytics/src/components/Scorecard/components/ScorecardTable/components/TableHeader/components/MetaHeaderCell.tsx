import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableColumnHeader } from "@dhis2/ui";
import { useScorecardState } from "../../../../StateProvider";
import i18n from "@dhis2/d2-i18n";
import styles from "../TableHeader.module.css";
import { FilterArea } from "./FilterArea";

export function MetaHeaderCell({
	column,
	header,
	table,
}: HeaderContext<ScorecardTableData, any>) {
	const state = useScorecardState();
	const hasOnePeriod = state?.hasOnePeriod ?? false;
	const dataInRows = state?.options?.showDataInRows ?? false;

	const rowSpan = dataInRows ? (hasOnePeriod ? "1" : "2") : "3";

	const filterColumn = header.subHeaders.find((header) =>
		header.column.getCanFilter(),
	)?.column;

	return (
		<DataTableColumnHeader
			align="right"
			onFilterIconClick={() => {}}
			sortIconTitle={i18n.t("Sort")}
			onSortIconClick={() => {}}
			sortDirection="default"
			fixed
			colSpan={header.colSpan.toString()}
			rowSpan={rowSpan}
			className={styles.metaHeader}
		>
			{!!filterColumn && <FilterArea column={filterColumn} />}
		</DataTableColumnHeader>
	);
}
