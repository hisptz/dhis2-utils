import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardAverageCellData,
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { useEffect, useMemo, useState } from "react";
import { DataTableCell } from "@dhis2/ui";
import type { AnalyticsData } from "../../../utils/data";
import { useScorecardData } from "../../DataProvider";
import { head, isEmpty, meanBy } from "lodash";
import { CellLoader } from "./CellLoader";
import { LinkedAverageCell, SingleAverageCell } from "./AverageCell";
import { useScorecardViewStateValue } from "../../../utils/viewState";

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
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [averageValues, setAverageValues] =
		useState<ScorecardAverageCellData[]>();

	useEffect(() => {
		setLoading(true);
		const listener = (completed: boolean) => {
			if (completed) {
				setAverageValues(
					getOrgUnitAverage({
						dataSourcesConfig,
						data: scorecardEngine.data,
					}),
				);
				setLoading(false);
			}
		};
		if (scorecardEngine.isDone) {
			setAverageValues(
				getOrgUnitAverage({
					dataSourcesConfig,
					data: scorecardEngine.data,
				}),
			);
			setLoading(false);
		} else {
			return scorecardEngine.addOnCompleteListener(listener);
		}
	}, [dataSourcesConfig]);

	if (loading) {
		return <CellLoader size={size} />;
	}

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
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [average, setAverage] = useState<number>();

	useEffect(() => {
		setLoading(true);
		const listener = (completed: boolean) => {
			if (completed) {
				setLoading(false);
				const orgUnitId = head(dataSourcesConfig)!;
				const dataValues = scorecardEngine.data.filter(
					(datum) => datum.ou === orgUnitId.orgUnit.uid,
				);
				const average = meanBy(dataValues, (value) =>
					parseFloat(value.value!),
				);
				setAverage(average);
			}
		};
		if (scorecardEngine.isDone) {
			const orgUnitId = head(dataSourcesConfig)!;
			const dataValues = scorecardEngine.data.filter(
				(datum) => datum.ou === orgUnitId.orgUnit.uid,
			);
			const average = meanBy(dataValues, (value) =>
				parseFloat(value.value!),
			);
			setAverage(average);
			setLoading(false);
		} else {
			return scorecardEngine.addOnCompleteListener(listener);
		}
	}, [dataSourcesConfig]);

	if (loading) {
		return <CellLoader size={size} />;
	}

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
	}, [table.getRowModel().rows]);

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
