import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardAverageCellData,
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { useMemo } from "react";
import { DataTableCell } from "@dhis2/ui";
import type { AnalyticsData } from "../../../utils/data";
import { compact, head, isEmpty, meanBy } from "lodash";
import { LinkedAverageCell, SingleAverageCell } from "./AverageCell";
import { useScorecardViewStateValue } from "../../../utils";
import { useDataValue } from "../../../hooks/value";

function getOrgUnitAverage({
	dataSourcesConfig,
	data,
}: {
	dataSourcesConfig: ScorecardTableCellConfig[];
	data: AnalyticsData[];
}): ScorecardAverageCellData[] {
	const dataSourceConfig = head(dataSourcesConfig)!;

	return dataSourceConfig?.dataSources?.map((config) => {
		const period = dataSourceConfig.currentPeriod!;
		const dataValues = data.filter(
			(datum) => datum.pe === period && datum.dx === config.id,
		);
		const average = meanBy(dataValues, (value) => parseFloat(value.value!));

		return {
			...config,
			data: {
				average,
			},
		};
	});
}

function OrgUnitFooterCell({
	dataSourcesConfig,
	size,
}: {
	dataSourcesConfig: ScorecardTableCellConfig[];
	size: number;
}) {
	const analyticsData = useDataValue({
		ou: dataSourcesConfig.map(({ orgUnit }) => orgUnit.uid),
		pe: compact(
			dataSourcesConfig.map(({ currentPeriod }) => currentPeriod),
		),
		dx: compact(
			dataSourcesConfig
				.map(({ dataSources }) => dataSources?.map(({ id }) => id))
				.flat(),
		),
	});

	const averageValues = useMemo(() => {
		if (!analyticsData) {
			return;
		}

		return getOrgUnitAverage({
			dataSourcesConfig,
			data: analyticsData,
		});
	}, [analyticsData, dataSourcesConfig]);

	if (isEmpty(averageValues)) {
		return <DataTableCell style={{ width: size }} bordered />;
	}

	if (averageValues?.length === 1) {
		return (
			<SingleAverageCell size={size} dataSource={head(averageValues)!} />
		);
	} else {
		return <LinkedAverageCell size={size} dataSources={averageValues!} />;
	}
}

function DataHolderFooterCell({
	dataSourcesConfig,
	size,
}: {
	dataSourcesConfig: ScorecardTableCellConfig[];
	size: number;
}) {
	const analyticsData = useDataValue({
		ou: dataSourcesConfig.map(({ orgUnit }) => orgUnit.uid),
		pe: compact(
			dataSourcesConfig.map(({ currentPeriod }) => currentPeriod),
		),
		dx: compact(
			dataSourcesConfig
				.map(({ dataSources }) => dataSources?.map(({ id }) => id))
				.flat(),
		),
	});
	const average = useMemo(() => {
		if (!analyticsData) {
			return;
		}
		return meanBy(analyticsData, (datum) => parseFloat(datum.value!)) as
			| number
			| undefined;
	}, [analyticsData]);

	if (isNaN(average as number)) {
		return (
			<DataTableCell style={{ width: size }} bordered align="center" />
		);
	}
	return (
		<DataTableCell style={{ width: size }} bordered align="center">
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}

export function DataFooterCell({
	table,
	column,
}: HeaderContext<ScorecardTableData, ScorecardTableCellConfig>) {
	const size = column.getSize();
	const showDataInRows =
		useScorecardViewStateValue<boolean>("showDataInRows");
	const dataSourceConfig = useMemo(() => {
		return table
			.getRowModel()
			.rows.map((row) =>
				row.getValue(column.id),
			) as ScorecardTableCellConfig[];
	}, [table, column.id]);

	if (showDataInRows) {
		return (
			<DataHolderFooterCell
				size={size}
				dataSourcesConfig={dataSourceConfig}
			/>
		);
	}

	return (
		<OrgUnitFooterCell size={size} dataSourcesConfig={dataSourceConfig} />
	);
}
