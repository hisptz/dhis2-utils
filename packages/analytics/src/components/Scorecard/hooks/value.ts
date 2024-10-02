import { useEffect, useState } from "react";
import type {
	ScorecardCellData,
	ScorecardTableCellConfig,
} from "../schemas/config";
import { useScorecardData } from "../components/DataProvider";
import type { DataEngineListener } from "../utils/dataEngine";
import type { AnalyticsData } from "../utils/data";
import { getValues } from "../utils/columns";
import { every } from "lodash";

function getDataValues({
	data,
	dataConfig,
}: {
	dataConfig: ScorecardTableCellConfig;
	data: AnalyticsData[];
}): ScorecardCellData[] {
	return dataConfig.dataSources.map((dataSource) => {
		const filteredData = data.filter((data) => {
			return (
				data.dx === dataSource.id &&
				[dataConfig.currentPeriod, dataConfig.previousPeriod].includes(
					data.pe,
				)
			);
		});
		const value = getValues({
			currentPeriod: dataConfig.currentPeriod!,
			previousPeriod: dataConfig.previousPeriod,
			values: filteredData,
		});

		if (!value.current) {
			return {
				...dataSource,
			} as ScorecardCellData;
		}

		return {
			...dataSource,
			data: value,
		} as ScorecardCellData;
	});
}

export function useCellValue(dataConfig: ScorecardTableCellConfig) {
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [cellData, setCellData] = useState<ScorecardCellData[]>([]);

	useEffect(() => {
		setLoading(true);
		const listener: DataEngineListener = (data) => {
			if (data === "done") {
				setLoading(false);
				setCellData((prevState) => {
					return prevState.map((value) => {
						if (!value.data) {
							return {
								...value,
								data: {
									current: undefined,
									previous: undefined,
								},
							};
						}

						return value;
					});
				});
			} else {
				const values = getDataValues({ data, dataConfig });
				const hasValues = every(values, (value) => !!value.data);
				setCellData(values);
				if (hasValues) {
					scorecardEngine.removeListener(listener);
					setLoading(false);
				}
			}
		};
		scorecardEngine.addListener(listener);
		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, [dataConfig]);

	return {
		loading,
		cellData,
	};
}
