import { DataTableCell } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import type { ScorecardTableData } from "../../../schemas/config";
import type { HeaderContext } from "@tanstack/react-table";
import { useMemo } from "react";

export function MetaFooterCell({
	column,
	table,
}: HeaderContext<ScorecardTableData, any>) {
	const colSpan = useMemo(() => {
		return (
			table
				.getVisibleLeafColumns()
				.findIndex(({ id }) => id === column.id) + 1
		);
	}, [table.getVisibleLeafColumns(), column.id]);

	return (
		<DataTableCell
			bordered
			width={`${column.getSize()}px`}
			align="center"
			colSpan={colSpan.toString()}
			fixed
			/*
      // @ts-ignore */
			left="0"
		>
			<b style={{ padding: "8px 0" }}>{i18n.t("Average")}</b>
		</DataTableCell>
	);
}
