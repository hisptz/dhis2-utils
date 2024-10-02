import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableColumnHeader } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import styles from "../TableHeader.module.css";
import { useScorecardStateSelector } from "../../../../StateProvider";

export function AverageHeaderCell({
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const dataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);
	const hasOnePeriod = useScorecardStateSelector<boolean>(["hasOnePeriod"]);
	const rowSpan = dataInRows
		? hasOnePeriod
			? "2"
			: "2"
		: hasOnePeriod
			? "2"
			: "3";

	return (
		<DataTableColumnHeader
			key={header.id}
			align="right"
			onFilterIconClick={() => {}}
			fixed
			colSpan={header.colSpan.toString()}
			rowSpan={rowSpan}
			className={styles.metaHeader}
		>
			<b>{i18n.t("Average")}</b>
		</DataTableColumnHeader>
	);
}
