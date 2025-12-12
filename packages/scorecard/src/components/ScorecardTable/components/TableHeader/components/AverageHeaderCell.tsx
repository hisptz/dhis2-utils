import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../../../schemas/config";
import { DataTableColumnHeader } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import styles from "../TableHeader.module.css";
import { useScorecardViewStateValue } from "../../../../../utils/viewState";
import { useHasOnePeriod } from "../../../../../utils/dimensionState";

export function AverageHeaderCell({
	header,
}: HeaderContext<ScorecardTableData, any>) {
	const dataInRows = useScorecardViewStateValue<boolean>("showDataInRows");
	const hasOnePeriod = useHasOnePeriod();
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
			colSpan={header.colSpan.toString()}
			rowSpan={rowSpan}
			className={styles.metaHeader}
		>
			<b>{i18n.t("Average")}</b>
		</DataTableColumnHeader>
	);
}
