import type { Analytics } from "@hisptz/dhis2-utils";
import { Options } from "highcharts";
import { useCallback, useEffect, useState } from "react";
import { DHIS2Chart } from "../models";
import { ChartConfig, ChartType } from "../types/props.js";
import { getChartInstance, updateChartOptions, updateLayout } from "../utils/chart.js";

export function useChart({
	id,
	analytics,
	config,
}: {
	id: string;
	analytics: Analytics;
	config: ChartConfig;
}): {
	chart?: Options;
	changeChartType: (type: ChartType) => void;
} {
	const [chart, setChart] = useState<Options | undefined>(
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
			const updatedOptions = updateChartOptions(config);
			const updatedConfig = { ...config, ...updatedOptions};
			const chartInstance: DHIS2Chart = getChartInstance(
				id,
				analytics,
				updatedConfig,
			);
			setChart(chartInstance.getOptions());
		}

	}, [analytics, config, id]);

	return {
		chart,
		changeChartType,
	};
}
