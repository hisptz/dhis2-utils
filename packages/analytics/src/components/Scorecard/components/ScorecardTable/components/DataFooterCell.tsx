import { DataTableCell } from "@dhis2/ui";
import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardTableCellData,
	ScorecardTableData,
} from "../../../schemas/config";
import { useMemo } from "react";
import { head, sum } from "lodash";
import { useScorecardState } from "../../StateProvider";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { useScorecardMeta } from "../../MetaProvider";
import { useScorecardConfig } from "../../ConfigProvider";

export function DataFooterCell({
	table,
	column,
}: HeaderContext<ScorecardTableData, ScorecardTableCellData>) {
	const state = useScorecardState();
	const meta = useScorecardMeta();
	const config = useScorecardConfig();
	const legendDefinition = useMemo(() => {
		if (state?.options?.showDataInRows) {
			return;
		}
		const dataValue = head(table.getRowModel().rows)?.getValue(
			column.id,
		) as ScorecardTableCellData;

		const dataSource = head(dataValue.dataSources);

		if (!dataSource) {
			return;
		}

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
				const value = row.getValue(column.id) as ScorecardTableCellData;
				return head(value.dataSources)?.data.current ?? 0;
			})
			.flat();
	}, [table, column]);
	const average = useMemo(() => {
		return Math.round((sum(dataValues) / dataValues.length) * 100) / 100;
	}, [dataValues]);

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
		>
			<b>{average}</b>
		</DataTableCell>
	);
}
