import { DHIS2Chart, setupHighchartsModules } from ".";
import { Meta, StoryObj } from "@storybook/react";
import columnData from "../../shared/resources/column-data.json";
import multiSeriesData from "../../shared/resources/multi-series-data.json";
import stackedChartData from "../../shared/resources/stacked-chart-data.json";
import pieData from "../../shared/resources/pie-data.json";
import complexMultiSeriesData from "../../shared/resources/complex-multi-series-data.json";
import { Analytics } from "@hisptz/dhis2-utils";
import HighCharts from "highcharts";

setupHighchartsModules(HighCharts);

const meta: Meta<typeof DHIS2Chart> = {
	component: DHIS2Chart,
	title: "DHIS2 Chart",
};

export default meta;

type Story = StoryObj<typeof DHIS2Chart>;

export const Default: Story = {
	name: "Column",
	args: {
		analytics: columnData as unknown as Analytics,
		config: {
			layout: {
				series: ["dx"],
				category: ["ou"],
				filter: ["pe"],
			},
			showFilterAsTitle: true,
			type: "column",
		},
	},
};

export const Bar: Story = {
	name: "Bar",
	args: {
		analytics: columnData as any,
		config: {
			layout: {
				series: ["dx"],
				category: ["ou"],
				filter: ["pe"],
			},
			showFilterAsTitle: true,
			type: "bar",
		},
	},
};
export const MultipleColumns: Story = {
	name: "Multiple columns",
	args: {
		analytics: multiSeriesData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "column",
		},
	},
};

export const StackedColumn: Story = {
	name: "Stacked column",
	args: {
		analytics: stackedChartData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "stacked-column",
		},
	},
};
export const StackedBar: Story = {
	name: "Stacked bar",
	args: {
		analytics: stackedChartData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "stacked-bar",
		},
	},
};
export const Line: Story = {
	name: "Line chart",
	args: {
		analytics: columnData as any,
		config: {
			layout: {
				series: ["dx"],
				category: ["ou"],
				filter: ["pe"],
			},
			showFilterAsTitle: true,
			type: "line",
		},
	},
};

export const MultipleLines: Story = {
	name: "Multi line",
	args: {
		analytics: multiSeriesData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "line",
		},
	},
};

export const PieChart: Story = {
	name: "Pie chart",
	args: {
		analytics: pieData as any,
		config: {
			layout: {
				series: ["dx"],
				category: [],
				filter: ["pe", "ou"],
			},
			showFilterAsTitle: true,
			type: "pie",
		},
	},
};

export const MultiSeries: Story = {
	name: "Multi series",
	args: {
		analytics: multiSeriesData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "multi-series",
			multiSeries: {
				series: [
					{
						id: "qhqAxPSTUXp",
						as: "column",
						yAxis: 0,
					},
					{
						id: "Vth0fbpFcsO",
						as: "line",
						cumulative: true,
						yAxis: 1,
					},
				],
				yAxes: [
					{
						id: "yAxis1",
						title: {
							text: "Koinandugu",
						},
						labels: {
							format: "{value}",
						},
					},
					{
						id: "yAxis2",
						title: {
							text: "Kono",
						},
						labels: {
							format: "{value}",
						},
						opposite: true,
					},
				],
				target: {
					id: "",
					styles: {
						color: "blue",
					},
					value: 45,
					label: {
						text: "Target",
						textAlign: "center",
						verticalAlign: "middle",
					},
				},
			},
		},
	},
};

export const ComplexMultiSeries: Story = {
	name: "Complex multi series",
	args: {
		analytics: complexMultiSeriesData as any,
		config: {
			layout: {
				series: ["dx"],
				category: ["pe"],
				filter: ["ou"],
			},
			type: "multi-series",
			showFilterAsTitle: true,
			multiSeries: {
				series: [
					{
						id: "QQkOAJFukyY",
						as: "column",
						yAxis: 0,
					},
					{
						id: "QQkOAJFukyY",
						as: "line",
						cumulative: true,
						yAxis: 1,
					},
				],
				yAxes: [
					{
						id: "yAxis1",
						title: {
							text: "Koinandugu",
						},
						labels: {
							format: "{value}",
						},
					},
					{
						id: "yAxis2",
						title: {
							text: "Kono",
						},
						labels: {
							format: "{value}",
						},
						opposite: true,
					},
				],
				target: {
					id: "",
					styles: {
						color: "blue",
					},
					value: 45,
					label: {
						text: "Target",
						textAlign: "center",
						verticalAlign: "middle",
					},
				},
			},
		},
	},
};
