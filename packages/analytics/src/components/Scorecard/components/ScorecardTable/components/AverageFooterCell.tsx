import { CircularLoader, DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardData } from "../../DataProvider";
import { useEffect, useState } from "react";
import type { AnalyticsData } from "../../../utils/data";
import { getAverageValue } from "../../../utils/columns";

export function AverageFooterCell({}: HeaderContext<ScorecardTableData, any>) {
	const meta = useScorecardMeta();
	const [loading, setLoading] = useState<boolean>(false);
	const [average, setAverage] = useState<number>();
	const { data: scorecardEngine } = useScorecardData();

	useEffect(() => {
		setLoading(true);
		const listener = (data: AnalyticsData[] | "done") => {
			if (data === "done") {
				setLoading(false);
				setAverage(
					getAverageValue({
						dataValues: scorecardEngine.data,
						meta: meta!,
					}),
				);
			}
		};
		scorecardEngine.addListener(listener);
		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, []);

	if (loading) {
		return (
			<DataTableCell align="center" bordered>
				<CircularLoader extrasmall />
			</DataTableCell>
		);
	}

	return (
		<DataTableCell bordered align="center">
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}
