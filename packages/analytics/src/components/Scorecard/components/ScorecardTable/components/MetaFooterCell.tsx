import { DataTableCell } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useScorecardStateSelector } from "../../StateProvider";

export function MetaFooterCell() {
	const itemNumber = useScorecardStateSelector<boolean>([
		"options",
		"itemNumber",
	]);

	return (
		<DataTableCell align="center" colSpan={itemNumber ? "3" : "2"} fixed>
			<b style={{ padding: "8px 0" }}>{i18n.t("Average")}</b>
		</DataTableCell>
	);
}
