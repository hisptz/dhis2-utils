import { DataTableCell } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useScorecardStateSelectorValue } from "../../../state/scorecardState";

export function MetaFooterCell() {
	const itemNumber = useScorecardStateSelectorValue<boolean>([
		"options",
		"itemNumber",
	]);

	return (
		<DataTableCell
			bordered
			width="300px"
			style={{
				width: "fit-content",
				minWidth: 300,
			}}
			align="center"
			colSpan={itemNumber ? "3" : "2"}
			fixed
			/*
      // @ts-ignore */
			left="0"
		>
			<b style={{ padding: "8px 0" }}>{i18n.t("Average")}</b>
		</DataTableCell>
	);
}
