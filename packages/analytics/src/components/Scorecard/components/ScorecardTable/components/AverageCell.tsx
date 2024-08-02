import type { CellContext } from "@tanstack/react-table";
import type { ScorecardTableData } from "../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import { useMemo } from "react";
import { head } from "lodash";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { useScorecardConfig } from "../../ConfigProvider";
import { useScorecardState } from "../../StateProvider";
import { useScorecardMeta } from "../../MetaProvider";

export function AverageCell(
	props: CellContext<
		ScorecardTableData,
		ScorecardTableData & { average: number }
	>,
) {
	const config = useScorecardConfig();
	const state = useScorecardState();
	const meta = useScorecardMeta();
	const value = props.getValue();
	const average = value.average;

	const legendDefinition = useMemo(() => {
		if (!state?.options?.showDataInRows) {
			return;
		}
		const dataSource = head(value.dataHolder?.dataSources);

		if (!dataSource) {
			return;
		}

		return getLegend({
			dataSource,
			config: config!,
			value: average,
			orgUnitLevels: meta!.orgUnitLevels,
		});
	}, [meta, state, config, average]);

	return (
		<DataTableCell
			bordered
			style={{
				background: legendDefinition?.color,
				textAlign: "center",
				minWidth: 100,
				color: legendDefinition
					? getTextColorFromBackgroundColor(legendDefinition?.color)
					: undefined,
			}}
			align="center"
			key={props.row.id}
		>
			<b>{average}</b>
		</DataTableCell>
	);
}
