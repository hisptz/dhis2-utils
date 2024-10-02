import type { CellContext } from "@tanstack/react-table";
import type {
	ScorecardDataSource,
	ScorecardTableData,
} from "../../../schemas/config";
import { DataTableCell } from "@dhis2/ui";
import { head, isEmpty } from "lodash";
import { useScorecardConfig } from "../../ConfigProvider";
import { useMemo } from "react";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { LinkedCell } from "./LinkedCell";

export function SingleAverageCell({
	dataSource,
}: {
	dataSource: ScorecardDataSource & { average: number };
}) {
	const config = useScorecardConfig();
	const legendDefinition = useMemo(() => {
		if (!dataSource) {
			return;
		}
		return getLegend({
			dataSource,
			config: config!,
			value: dataSource.average,
		});
	}, [dataSource]);

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
			<b>{dataSource.average.toString()}</b>
		</DataTableCell>
	);
}

export function LinkedAverageCell({
	dataSources,
}: {
	dataSources: Array<ScorecardDataSource & { average: number }>;
}) {
	const [top, bottom] = dataSources ?? [];
	const config = useScorecardConfig();
	const topLegendDefinition = useMemo(() => {
		if (!top) {
			return;
		}
		return getLegend({
			dataSource: top,
			config: config!,
			value: top.average,
		});
	}, [top]);
	const bottomLegendDefinition = useMemo(() => {
		if (!bottom) {
			return;
		}
		return getLegend({
			dataSource: bottom,
			config: config!,
			value: bottom.average,
		});
	}, [bottom]);

	return (
		<LinkedCell
			top={{
				dataSource: {
					...top,
				},
				legendDefinition: topLegendDefinition,
				value: top.average,
			}}
			bottom={{
				dataSource: { ...bottom },
				legendDefinition: bottomLegendDefinition,
				value: bottom.average,
			}}
		/>
	);
}

export function AverageCell(
	props: CellContext<
		ScorecardTableData,
		ScorecardTableData & {
			average: number;
			dataSources?: Array<ScorecardDataSource & { average: number }>;
		}
	>,
) {
	const value = props.getValue();
	const average = value.average;
	const dataSources = value?.dataSources;

	if (!isEmpty(dataSources)) {
		if (dataSources!.length === 1) {
			return <SingleAverageCell dataSource={head(dataSources)!} />;
		} else {
			return <LinkedAverageCell dataSources={dataSources!} />;
		}
	}

	return (
		<DataTableCell bordered align="center" key={props.row.id}>
			<b>{average}</b>
		</DataTableCell>
	);
}
