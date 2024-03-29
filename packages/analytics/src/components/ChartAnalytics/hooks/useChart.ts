import type { Analytics } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";
import { useCallback, useEffect, useState } from "react";
import { DHIS2Chart } from "../models/index.js";
import { ChartConfig, ChartType } from "../types/props.js";
import { getChartInstance, updateLayout } from "../utils/chart.js";

export function useChart({
	id,
	analytics,
	config,
}: {
	id: string;
	analytics: Analytics;
	config: ChartConfig;
}): {
	chart?: HighCharts.Options;
	changeChartType: (type: ChartType) => void;
} {
	const [chart, setChart] = useState<HighCharts.Options | undefined>(
		getChartInstance(id, analytics, config).getOptions(),
	);

	const changeChartType = useCallback(
		(type: ChartType) => {
			const updatedLayout = updateLayout(config, { type });
			const updatedConfig = { ...config, layout: updatedLayout, type };
			const chartInstance: DHIS2Chart = getChartInstance(
				id,
				analytics,
				updatedConfig,
			);
			setChart(chartInstance.getOptions());
		},
		[config, id, analytics],
	);

	useEffect(() => {
		if (analytics && config) {
			const chartInstance: DHIS2Chart = getChartInstance(
				id,
				analytics,
				config,
			);
			setChart(chartInstance.getOptions());
		}
	}, [analytics, config, id]);

	return {
		chart,
		changeChartType,
	};
}
