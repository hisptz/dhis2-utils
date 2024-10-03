import type { HeaderContext } from "@tanstack/react-table";
import type {
	ScorecardAverageCellData,
	ScorecardTableCellConfig,
	ScorecardTableData,
} from "../../../schemas/config";
import { useEffect, useMemo, useState } from "react";
import { useScorecardStateSelector } from "../../StateProvider";
import { DataTableCell } from "@dhis2/ui";
import type { AnalyticsData } from "../../../utils/data";
import { useScorecardData } from "../../DataProvider";
import { head, isEmpty, meanBy } from "lodash";
import { CellLoader } from "./CellLoader";
import { LinkedAverageCell, SingleAverageCell } from "./AverageCell";

function getOrgUnitAverage({
	dataSourcesConfig,
	data,
}: {
	dataSourcesConfig: ScorecardTableCellConfig[];
	data: AnalyticsData[];
}): ScorecardAverageCellData[] {
	const dataSourceConfig = head(dataSourcesConfig)!;

	return dataSourceConfig.dataSources?.map((config) => {
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
}: {
	dataSourcesConfig: ScorecardTableCellConfig[];
}) {
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [averageValues, setAverageValues] =
		useState<ScorecardAverageCellData[]>();

	useEffect(() => {
		setLoading(true);
		const listener = (data: AnalyticsData[] | "done") => {
			if (data === "done") {
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
			scorecardEngine.addListener(listener);
		}

		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, [dataSourcesConfig]);

	if (loading) {
		return <CellLoader />;
	}

	if (isEmpty(averageValues)) {
		return <DataTableCell bordered>n/A</DataTableCell>;
	}

	if (averageValues?.length === 1) {
		return <SingleAverageCell dataSource={head(averageValues)!} />;
	} else {
		return <LinkedAverageCell dataSources={averageValues!} />;
	}
}

function DataHolderFooterCell({
	dataSourcesConfig,
}: {
	dataSourcesConfig: ScorecardTableCellConfig[];
}) {
	const { data: scorecardEngine } = useScorecardData();
	const [loading, setLoading] = useState<boolean>(false);
	const [average, setAverage] = useState<number>();

	useEffect(() => {
		setLoading(true);
		const listener = (data: AnalyticsData[] | "done") => {
			if (data === "done") {
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
			scorecardEngine.addListener(listener);
		}

		return () => {
			scorecardEngine.removeListener(listener);
		};
	}, [dataSourcesConfig]);

	if (loading) {
		return <CellLoader />;
	}
	return (
		<DataTableCell bordered align="center">
			<b>{average?.toFixed(2).toString()}</b>
		</DataTableCell>
	);
}

export function DataFooterCell({
	table,
	column,
}: HeaderContext<ScorecardTableData, ScorecardTableCellConfig>) {
	const showDataInRows = useScorecardStateSelector<boolean>([
		"options",
		"showDataInRows",
	]);
	const dataSourceConfig = useMemo(() => {
		return table
			.getRowModel()
			.rows.map((row) =>
				row.getValue(column.id),
			) as ScorecardTableCellConfig[];
	}, [table.getRowModel().rows]);

	if (showDataInRows) {
		return <DataHolderFooterCell dataSourcesConfig={dataSourceConfig} />;
	}

	return <OrgUnitFooterCell dataSourcesConfig={dataSourceConfig} />;
}
