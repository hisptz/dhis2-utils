import type { CellContext } from "@tanstack/react-table";
import type {
	ScorecardAverageCellData,
	ScorecardTableAverageCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { CircularLoader, DataTableCell } from "@dhis2/ui";
import { head, isEmpty } from "lodash";
import { useScorecardConfig } from "../../ConfigProvider";
import { useMemo } from "react";
import {
	getLegend,
	getTextColorFromBackgroundColor,
} from "../../../utils/legends";
import { LinkedCell } from "./LinkedCell";
import {
	useDataHolderAverageCellValue,
	useOrgUnitAverageCellValue,
} from "../../../hooks/value";
import { useScorecardStateSelector } from "../../StateProvider";
import { CellLoader } from "./CellLoader";

export function SingleAverageCell({
	dataSource,
}: {
	dataSource: ScorecardAverageCellData;
}) {
	const config = useScorecardConfig();
	const legendDefinition = useMemo(() => {
		if (!dataSource) {
			return;
		}
		return getLegend({
			dataSource,
			config: config!,
			value: dataSource.data.average,
		});
	}, [dataSource]);

	if (!dataSource.data.average || isNaN(dataSource.data.average)) {
		return <DataTableCell bordered />;
	}

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
			<b>{dataSource.data.average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}

export function LinkedAverageCell({
	dataSources,
}: {
	dataSources: Array<ScorecardAverageCellData>;
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
			value: top.data.average,
		});
	}, [top]);
	const bottomLegendDefinition = useMemo(() => {
		if (!bottom) {
			return;
		}
		return getLegend({
			dataSource: bottom,
			config: config!,
			value: bottom.data.average,
		});
	}, [bottom]);

	return (
		<LinkedCell
			top={{
				dataSource: {
					...top,
					data: {
						current: top.data.average,
					},
				},
				legendDefinition: topLegendDefinition,
				value: top.data.average,
			}}
			bottom={{
				dataSource: {
					...bottom,
					data: {
						current: bottom.data.average,
					},
				},
				legendDefinition: bottomLegendDefinition,
				value: bottom.data.average,
			}}
		/>
	);
}

function DataSourceAverageCell(
	props: CellContext<ScorecardTableData, ScorecardTableAverageCellConfig>,
) {
	const dataConfig = useMemo(() => props.getValue(), [props.getValue()]);
	const { cellData: dataSources, loading } =
		useDataHolderAverageCellValue(dataConfig);

	if (loading) {
		return <CellLoader />;
	}

	if (!isEmpty(dataSources)) {
		if (dataSources?.length === 1) {
			return <SingleAverageCell dataSource={head(dataSources)!} />;
		} else {
			return <LinkedAverageCell dataSources={dataSources!} />;
		}
	}

	return <DataTableCell />;
}

function OrgUnitAverageCell(
	props: CellContext<ScorecardTableData, ScorecardTableAverageCellConfig>,
) {
	const dataConfig = useMemo(() => props.getValue(), [props.getValue()]);
	const { loading, average } = useOrgUnitAverageCellValue(dataConfig);

	if (loading) {
		return (
			<DataTableCell align="center" bordered>
				<CircularLoader extrasmall />
			</DataTableCell>
		);
	}

	return (
		<DataTableCell bordered align="center" key={props.row.id}>
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}

export function AverageCell(
	props: CellContext<ScorecardTableData, ScorecardTableAverageCellConfig>,
) {
	const showDataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);

	if (showDataInRows) {
		return <DataSourceAverageCell {...props} />;
	}

	return <OrgUnitAverageCell {...props} />;
}
