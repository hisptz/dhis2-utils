import { DataTableCell } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { useScorecardStateSelector } from "../../StateProvider";

export function MetaFooterCell() {
	const itemNumber = useScorecardStateSelector<boolean>([
		"options",
		"itemNumber",
	]);

	return (
		<DataTableCell
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
