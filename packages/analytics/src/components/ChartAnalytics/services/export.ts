import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/exporting";
import "highcharts/modules/export-data";
import "highcharts/modules/full-screen";
import "highcharts/modules/accessibility";

/**
 * @deprecated since `v2`. Not needed for highcharts > v12
 * */
export function setupHighchartsModules(highcharts: typeof Highcharts) {
	console.warn(
		`Due to highchart changes this is no longer needed. You can remove this call.`,
	);
}

export function onFullScreenView(
	chartRef: HighchartsReact.RefObject,
	options?: Highcharts.Options,
) {
	chartRef?.chart?.fullscreen.toggle();
}

export function onPDFDownload(
	chartRef: HighchartsReact.RefObject,
	options?: Highcharts.Options,
) {
	// @ts-ignore

	chartRef?.chart.exportChart({ type: "application/pdf" }, options ?? {});
}

export function onCSVDownload(
	chartRef: HighchartsReact.RefObject,
	options?: Highcharts.Options,
) {
	// @ts-ignore

	chartRef?.chart.downloadCSV();
}

export const onImageDownload = (
	chartRef: HighchartsReact.RefObject,
	type: "png" | "svg+xml" | "jpeg",
	options?: Highcharts.Options,
) => {
	// @ts-ignore
	chartRef?.chart.exportChart({ type: `image/${type}` }, options ?? {});
};

export const onViewAsTable = (
	chartRef: HighchartsReact.RefObject,
	show: boolean,
) => {
	const options = chartRef?.chart.options;
	chartRef?.chart?.update({
		...options,
		exporting: {
			...options?.exporting,
			showTable: show,
		},
	});
};
