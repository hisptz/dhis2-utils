import { useScorecardMeta } from "../components/MetaProvider";
import { useScorecardConfig } from "../components/ConfigProvider";
import { useMemo } from "react";
import { head, sum } from "lodash";
import type {
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../schemas/config";
import { getLegend } from "../utils/legends";
import type { HeaderContext } from "@tanstack/react-table";

export function useAverage({
	dataSource,
	table,
	column,
}: HeaderContext<ScorecardTableData, ScorecardTableCellConfig> & {
	dataSource: ScorecardTableCellConfig["dataSources"][number];
}) {
	const meta = useScorecardMeta();
	const config = useScorecardConfig();
	const legendDefinition = useMemo(() => {
		if (!dataSource) {
			return;
		}

		const dataValue = head(table.getRowModel().rows)?.getValue(
			column.id,
		) as ScorecardTableCellConfig;

		return getLegend({
			dataSource,
			config: config!,
			value: dataSource.data.current,
			orgUnit: dataValue.orgUnit,
			periodId: dataValue.period,
			orgUnitLevels: meta!.orgUnitLevels,
		});
	}, [table]);
	const dataValues = useMemo(() => {
		const rowModel = table.getRowModel();
		return rowModel.rows
			.map((row) => {
				const value = row.getValue(
					column.id,
				) as ScorecardTableCellConfig;
				return head(value.dataSources)?.data.current ?? 0;
			})
			.flat();
	}, [table, column]);
	const average = useMemo(() => {
		return Math.round((sum(dataValues) / dataValues.length) * 100) / 100;
	}, [dataValues]);

	return {
		average,
		legendDefinition,
	};
}
