import type { ScorecardTableCellData } from "../schemas/config";
import { useScorecardConfig } from "../components/ConfigProvider";
import { useScorecardMeta } from "../components/MetaProvider";
import { useMemo } from "react";
import { getLegend } from "../utils/legends";
import type { ItemMeta } from "./metadata";

export function useCellData({
	dataSource,
	orgUnit,
	period,
}: {
	dataSource?: ScorecardTableCellData["dataSources"][number];
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
