import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardData } from "../../DataProvider";
import { useEffect, useState } from "react";
import type { AnalyticsData } from "../../../utils/data";
import { getAverageValue } from "../../../utils/columns";
import { CellLoader } from "./CellLoader";

export function AverageFooterCell({}: HeaderContext<ScorecardTableData, any>) {
	const meta = useScorecardMeta();
	const [loading, setLoading] = useState<boolean>(false);
	const [average, setAverage] = useState<number>();
	const { data: scorecardEngine } = useScorecardData();

	useEffect(() => {
		setLoading(true);
		const listener = (data: AnalyticsData[] | "done") => {
			if (data === "done") {
				setAverage(
					getAverageValue({
						dataValues: scorecardEngine.data,
						meta: meta!,
					}),
				);
				setLoading(false);
			}
		};
		if (scorecardEngine.isDone) {
			setAverage(
				getAverageValue({
					dataValues: scorecardEngine.data,
					meta: meta!,
				}),
			);
			setLoading(false);
		} else {
			scorecardEngine.addListener(listener);
		}
		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, []);

	if (loading) {
		return <CellLoader />;
	}

	if (!average || isNaN(average)) {
		return <DataTableCell bordered />;
	}

	return (
		<DataTableCell bordered align="center">
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}
