import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import i18n from "@dhis2/d2-i18n";
import { useScorecardState } from "../../StateProvider";

export function MetaFooterCell(
	props: HeaderContext<ScorecardTableData, unknown>,
) {
	const state = useScorecardState();
	const itemNumber = state?.options.itemNumber ?? false;

	return (
		<DataTableCell align="center" colSpan={itemNumber ? "3" : "2"} fixed>
			<b style={{ padding: "8px 0" }}>{i18n.t("Average")}</b>
		</DataTableCell>
	);
}
