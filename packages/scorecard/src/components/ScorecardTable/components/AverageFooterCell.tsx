import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardData } from "../../DataProvider";
import { useMemo, useSyncExternalStore } from "react";
import { getAverageValue } from "../../../utils/columns";
import { useScorecardLoadingCompleted } from "../../../hooks/completed";

export function AverageFooterCell({
	column,
}: HeaderContext<ScorecardTableData, any>) {
	const size = column.getSize();
	const { data: scorecardEngine } = useScorecardData();
	const meta = useScorecardMeta();
	const isDone = useScorecardLoadingCompleted();
	const average = useMemo(() => {
		if (!isDone) return;
		return getAverageValue({
			dataValues: Array.from(scorecardEngine.data.values()),
			meta: meta!,
		});
	}, [meta, isDone, scorecardEngine.data]);

	if (!average || isNaN(average)) {
		return <DataTableCell style={{ width: size }} bordered />;
	}

	return (
		<DataTableCell style={{ width: size }} bordered align="center">
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}
