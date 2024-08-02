import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardData } from "../../DataProvider";
import { useMemo } from "react";
import { getAverageValue } from "../../../utils/columns";

export function AverageFooterCell({}: HeaderContext<ScorecardTableData, any>) {
	const meta = useScorecardMeta();
	const { rawData } = useScorecardData();

	const average = useMemo(() => {
		console.log({
			meta,
			rawData,
		});

		return getAverageValue({
			dataValues: rawData,
			meta: meta!,
		});
	}, [rawData, meta]);

	return (
		<DataTableCell bordered align="center">
			<b>{average}</b>
		</DataTableCell>
	);
}
