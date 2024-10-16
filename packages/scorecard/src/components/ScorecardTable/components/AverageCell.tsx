import type { CellContext } from "@tanstack/react-table";
import type {
	ScorecardAverageCellData,
	ScorecardTableAverageCellConfig,
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
import {
	useDataHolderAverageCellValue,
	useOrgUnitAverageCellValue,
} from "../../../hooks/value";
import { CellLoader } from "./CellLoader";
import { useScorecardStateSelectorValue } from "../../../state";

export function SingleAverageCell({
	dataSource,
	size,
}: {
	dataSource: ScorecardAverageCellData;
	size: number;
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
				width: size,
				height: 48,
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
	size,
}: {
	dataSources: Array<ScorecardAverageCellData>;
	size: number;
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
			size={size}
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
	const size = props.cell.column.getSize();
	const dataConfig = useMemo(() => props.getValue(), [props.getValue()]);
	const { cellData: dataSources, loading } =
		useDataHolderAverageCellValue(dataConfig);

	if (loading) {
		return <CellLoader size={size} />;
	}

	if (!isEmpty(dataSources)) {
		if (dataSources?.length === 1) {
			return (
				<SingleAverageCell
					size={size}
					dataSource={head(dataSources)!}
				/>
			);
		} else {
			return <LinkedAverageCell size={size} dataSources={dataSources!} />;
		}
	}

	return <DataTableCell bordered style={{ width: size }} />;
}

function OrgUnitAverageCell(
	props: CellContext<ScorecardTableData, ScorecardTableAverageCellConfig>,
) {
	const size = props.cell.column.getSize();
	const dataConfig = useMemo(() => props.getValue(), [props.getValue()]);
	const { loading, average } = useOrgUnitAverageCellValue(dataConfig);

	if (loading) {
		return <CellLoader size={size} />;
	}

	if (isNaN(average as number)) {
		return (
			<DataTableCell
				style={{ width: size }}
				bordered
				align="center"
				key={props.row.id}
			/>
		);
	}

	return (
		<DataTableCell
			style={{ width: size }}
			bordered
			align="center"
			key={props.row.id}
		>
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}

export function AverageCell(
	props: CellContext<ScorecardTableData, ScorecardTableAverageCellConfig>,
) {
	const showDataInRows = useScorecardStateSelectorValue<boolean>([
		"options",
		"showDataInRows",
	]);

	if (showDataInRows) {
		return <DataSourceAverageCell {...props} />;
	}

	return <OrgUnitAverageCell {...props} />;
}
