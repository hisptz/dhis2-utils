import { useEffect, useState } from "react";
import type {
	ScorecardAverageCellData,
	ScorecardCellData,
	ScorecardTableAverageCellConfig,
	ScorecardTableCellConfig,
} from "../schemas/config";
import { useScorecardData } from "../components/DataProvider";
import type { DataEngineListener } from "../utils/dataEngine";
import type { AnalyticsData } from "../utils/data";
import { getValues } from "../utils/columns";
import { every, isEqual, meanBy } from "lodash";

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
				data.ou === dataConfig.orgUnit.uid &&
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
				data: {
					current: undefined,
					previous: undefined,
				},
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
				setCellData((prevState) => {
					if (isEqual(prevState, values)) {
						return prevState;
					} else {
						return values;
					}
				});
				if (hasValues) {
					scorecardEngine.removeListener(listener);
					setLoading(false);
				}
			}
		};
		if (scorecardEngine.isDone) {
			const values = getDataValues({
				data: scorecardEngine.data,
				dataConfig,
			});
			setCellData(values);
			setLoading(false);
		} else {
			scorecardEngine.addListener(listener);
		}
		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, [dataConfig]);

	return {
		loading,
		cellData,
	};
}

function getDataHolderAverageValues({
	data,
	dataConfig,
}: {
	dataConfig: ScorecardTableAverageCellConfig;
	data: AnalyticsData[];
}): ScorecardAverageCellData[] {
	return (
		dataConfig.dataHolder?.dataSources.map((source) => {
			const dataValues = data.filter((datum) => {
				return datum.dx === source.id;
			});
			const average = meanBy(dataValues, (value) =>
				parseFloat(value.value!),
			);

			return {
				...source,
				data: {
					average,
				},
			};
		}) ?? []
	);
}

export function useDataHolderAverageCellValue(
	dataConfig: ScorecardTableAverageCellConfig,
) {
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [cellData, setCellData] = useState<ScorecardAverageCellData[]>([]);

	useEffect(() => {
		setLoading(true);
		const listener: DataEngineListener = (data) => {
			if (data === "done") {
				setLoading(false);
				setCellData(
					getDataHolderAverageValues({
						data: scorecardEngine.data,
						dataConfig,
					}),
				);
			} else {
			}
		};
		if (scorecardEngine.isDone) {
			setLoading(false);
			setCellData(
				getDataHolderAverageValues({
					data: scorecardEngine.data,
					dataConfig,
				}),
			);
		} else {
			scorecardEngine.addListener(listener);
		}
		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, [dataConfig]);

	return {
		loading,
		cellData,
	};
}

function getOrgUnitAverageValues({
	data,
	dataConfig,
}: {
	dataConfig: ScorecardTableAverageCellConfig;
	data: AnalyticsData[];
}): number {
	const dataValues = data.filter((datum) => {
		return datum.ou === dataConfig.orgUnit!.uid;
	});

	return meanBy(dataValues, (value) => parseFloat(value.value!));
}

export function useOrgUnitAverageCellValue(
	dataConfig: ScorecardTableAverageCellConfig,
) {
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [average, setAverage] = useState<number | null>(null);

	useEffect(() => {
		setLoading(true);
		const listener: DataEngineListener = (data) => {
			if (data === "done") {
				setLoading(false);
				setAverage(
					getOrgUnitAverageValues({
						data: scorecardEngine.data,
						dataConfig,
					}),
				);
			} else {
			}
		};
		if (scorecardEngine.isDone) {
			setLoading(false);
			setAverage(
				getOrgUnitAverageValues({
					data: scorecardEngine.data,
					dataConfig,
				}),
			);
		} else {
			scorecardEngine.addListener(listener);
		}
		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, [dataConfig]);

	return {
		loading,
		average,
	};
}
