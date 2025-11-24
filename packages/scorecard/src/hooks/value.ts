import { useCallback, useMemo, useSyncExternalStore } from "react";
import type {
	ScorecardAverageCellData,
	ScorecardCellData,
	ScorecardTableAverageCellConfig,
	ScorecardTableCellConfig,
} from "../schemas/config";
import { useScorecardData, useScorecardMeta } from "../components";

import type { AnalyticsData } from "../utils/data";
import { getValues } from "../utils/columns";
import { compact, flatten, meanBy } from "lodash";

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

export function useDataValue(config: {
	dx: string[];
	pe: string[];
	ou: string[];
}) {
	const { data: scorecardEngine } = useScorecardData();
	const getSnapshot = useCallback(scorecardEngine.getSnapshot(config), [
		config,
	]);
	return useSyncExternalStore(
		(listener) => scorecardEngine.addGeneralListener(listener),
		getSnapshot,
	);
}

export function useCellValue(dataConfig: ScorecardTableCellConfig) {
	const analyticsData = useDataValue({
		dx: dataConfig.dataSources.map((source) => source.id),
		pe: compact([dataConfig.currentPeriod!, dataConfig.previousPeriod]),
		ou: [dataConfig.orgUnit.uid],
	});

	const cellData = useMemo(() => {
		return analyticsData
			? getDataValues({ dataConfig, data: analyticsData })
			: undefined;
	}, [analyticsData]);

	return {
		loading: false,
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
	const { periods, orgUnits } = useScorecardMeta()!;
	const analyticsData = useDataValue({
		dx:
			flatten(
				dataConfig.dataHolder?.dataSources.map((source) => source.id),
			) ?? [],
		ou: orgUnits.map(({ uid }) => uid),
		pe: periods.map(({ uid }) => uid),
	});
	const cellData = useMemo(() => {
		return analyticsData
			? getDataHolderAverageValues({
					data: analyticsData,
					dataConfig,
				})
			: undefined;
	}, [analyticsData]);

	return {
		loading: false,
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
		return datum.ou === dataConfig.orgUnit?.uid;
	});
	return meanBy(dataValues, (value) => parseFloat(value.value!));
}

export function useOrgUnitAverageCellValue(
	dataConfig: ScorecardTableAverageCellConfig,
) {
	const { periods, dataItems } = useScorecardMeta()!;

	const analyticsData = useDataValue({
		dx: dataItems.map((item) => item.uid),
		ou: compact([dataConfig.orgUnit?.uid]),
		pe: periods.map(({ uid }) => uid),
	});
	const average = useMemo(() => {
		return analyticsData
			? getOrgUnitAverageValues({
					data: analyticsData,
					dataConfig,
				})
			: undefined;
	}, [analyticsData]);

	return {
		loading: false,
		average,
	};
}
