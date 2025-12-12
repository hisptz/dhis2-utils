import type { ScorecardCellData } from "../schemas/config";
import { useScorecardConfig, useScorecardMeta } from "../components";
import { useMemo } from "react";
import { getLegend } from "../utils/legends";
import type { ItemMeta } from "./metadata";

export function useCellData({
	dataSource,
	orgUnit,
	period,
}: {
	dataSource?: ScorecardCellData;
	orgUnit: ItemMeta & { hierarchy: string };
	period: string;
}) {
	const config = useScorecardConfig();
	const meta = useScorecardMeta();

	const currentValue = dataSource?.data.current;

	const legendDefinition = useMemo(() => {
		if (!dataSource) return;
		return getLegend({
			dataSource,
			value: currentValue,
			orgUnitLevels: meta!.orgUnitLevels,
			config: config!,
			orgUnit,
			periodId: period,
		});
	}, [dataSource, currentValue, meta, orgUnit, period]);

	return {
		currentValue,
		legendDefinition,
	};
}
