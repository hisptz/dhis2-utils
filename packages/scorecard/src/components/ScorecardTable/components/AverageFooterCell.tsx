import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardData } from "../../DataProvider";
import { useEffect, useState } from "react";
import { getAverageValue } from "../../../utils/columns";
import { CellLoader } from "./CellLoader";

export function AverageFooterCell({
	column,
}: HeaderContext<ScorecardTableData, any>) {
	const size = column.getSize();
	const meta = useScorecardMeta();
	const [loading, setLoading] = useState<boolean>(false);
	const [average, setAverage] = useState<number>();
	const { data: scorecardEngine } = useScorecardData();

	useEffect(() => {
		setLoading(true);
		const listener = (completed: boolean) => {
			if (completed) {
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
			return scorecardEngine.addOnCompleteListener(listener);
		}
	}, []);

	if (loading) {
		return <CellLoader size={size} />;
	}

	if (!average || isNaN(average)) {
		return <DataTableCell style={{ width: size }} bordered />;
	}

	return (
		<DataTableCell style={{ width: size }} bordered align="center">
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}
