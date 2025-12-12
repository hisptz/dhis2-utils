import { DHIS2Chart } from ".";
import { Meta, StoryObj } from "@storybook/react";
import columnData from "../../shared/resources/column-data.json";
import multiSeriesData from "../../shared/resources/multi-series-data.json";
import stackedChartData from "../../shared/resources/stacked-chart-data.json";
import pieData from "../../shared/resources/pie-data.json";
import gaugeData from "../../shared/resources/gauge-data.json";
import complexMultiSeriesData from "../../shared/resources/complex-multi-series-data.json";
import { Analytics } from "@hisptz/dhis2-utils";

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
export const ColumnWithLegendSet: Story = {
	name: "Column with legend set",
	args: {
		analytics: columnData as unknown as Analytics,
		config: {
			layout: {
				series: ["dx"],
				category: ["ou"],
				filter: ["pe"],
			},
			legendSet: {
				legends: [
					{
						startValue: 0,
						endValue: 100,
						color: "#DC00FF",
						id: "wfbGANgbnMR",
						name: "Invalid",
					},
					{
						startValue: 100,
						endValue: 200,
						color: "#0011FF",
						id: "ee8QJxth4ul",
						name: "Overstock",
					},
					{
						startValue: 200,
						endValue: 300,
						color: "#EE391E",
						id: "fFBIEwglorN",
						name: "Stock out",
					},
					{
						startValue: 300,
						endValue: 400,
						color: "#0BFF00",
						id: "mmvDbIcm41d",
						name: "Adequate stock",
					},
					{
						startValue: 400,
						endValue: 500,
						color: "#FEFB08",
						id: "wAdm1fy3Fmk",
						name: "Understock",
					},
				],
				id: "f1hWZIYCTzc",
				name: "Stock coverage time",
			},
			showFilterAsTitle: true,
			type: "column",
		},
	},
};
export const ColumnWithLegendSetPerItem: Story = {
	name: "Column with legend set per data item",
	args: {
		analytics: columnData as unknown as Analytics,
		config: {
			layout: {
				series: ["dx"],
				category: ["ou"],
				filter: ["pe"],
			},
			legendSet: [
				{
					dataItem: "Uvn6LCg7dVU",
					legendSet: {
						name: "ANC Coverage",
						legends: [
							{
								name: "High Plus",
								startValue: 80,
								endValue: 90,
								color: "#FED976",
								id: "LHzMx7m1mo7",
							},
							{
								name: "Great",
								startValue: 90,
								endValue: 120,
								color: "#FFFFB2",
								id: "nFM35aXnjG4",
							},
							{
								name: "Medium Pl.",
								startValue: 50,
								endValue: 70,
								color: "#FD8D3C",
								id: "R09fMgqwz7l",
							},
							{
								name: "Medium",
								startValue: 30,
								endValue: 50,
								color: "#F03B20",
								id: "fyn331OKcrc",
							},
							{
								name: "Invalid",
								startValue: 120,
								endValue: 990,
								color: "#CCCCCC",
								id: "uLeRgauKbmk",
							},
							{
								name: "Low",
								startValue: 0,
								endValue: 30,
								color: "#BD0026",
								id: "YCSOboULcBM",
							},
							{
								name: "High",
								startValue: 70,
								endValue: 80,
								color: "#FEB24C",
								id: "XMzyLoC0hdi",
							},
						],
						displayName: "ANC Coverage",
						id: "fqs276KXCXi",
					},
				},
			],
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
export const BarWithLegendSet: Story = {
	name: "Bar with legend set",
	args: {
		analytics: columnData as any,
		config: {
			layout: {
				series: ["dx"],
				category: ["ou"],
				filter: ["pe"],
			},
			legendSet: {
				legends: [
					{
						startValue: 0,
						endValue: 100,
						color: "#DC00FF",
						id: "wfbGANgbnMR",
						name: "Invalid",
					},
					{
						startValue: 100,
						endValue: 200,
						color: "#0011FF",
						id: "ee8QJxth4ul",
						name: "Overstock",
					},
					{
						startValue: 200,
						endValue: 300,
						color: "#EE391E",
						id: "fFBIEwglorN",
						name: "Stock out",
					},
					{
						startValue: 300,
						endValue: 400,
						color: "#0BFF00",
						id: "mmvDbIcm41d",
						name: "Adequate stock",
					},
					{
						startValue: 400,
						endValue: 500,
						color: "#FEFB08",
						id: "wAdm1fy3Fmk",
						name: "Understock",
					},
				],
				id: "f1hWZIYCTzc",
				name: "Stock coverage time",
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
export const MultipleColumnsWithLegendSet: Story = {
	name: "Multiple columns with legend set",
	args: {
		analytics: multiSeriesData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			legendSet: {
				legends: [
					{
						startValue: 0,
						endValue: 100,
						color: "#DC00FF",
						id: "wfbGANgbnMR",
						name: "Invalid",
					},
					{
						startValue: 100,
						endValue: 200,
						color: "#0011FF",
						id: "ee8QJxth4ul",
						name: "Overstock",
					},
					{
						startValue: 200,
						endValue: 300,
						color: "#EE391E",
						id: "fFBIEwglorN",
						name: "Stock out",
					},
					{
						startValue: 300,
						endValue: 400,
						color: "#0BFF00",
						id: "mmvDbIcm41d",
						name: "Adequate stock",
					},
					{
						startValue: 400,
						endValue: 500,
						color: "#FEFB08",
						id: "wAdm1fy3Fmk",
						name: "Understock",
					},
				],
				id: "f1hWZIYCTzc",
				name: "Stock coverage time",
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
			legendSet: {
				legends: [
					{
						startValue: 0,
						endValue: 100,
						color: "#DC00FF",
						id: "wfbGANgbnMR",
						name: "Invalid",
					},
					{
						startValue: 100,
						endValue: 200,
						color: "#0011FF",
						id: "ee8QJxth4ul",
						name: "Overstock",
					},
					{
						startValue: 200,
						endValue: 300,
						color: "#EE391E",
						id: "fFBIEwglorN",
						name: "Stock out",
					},
					{
						startValue: 300,
						endValue: 400,
						color: "#0BFF00",
						id: "mmvDbIcm41d",
						name: "Adequate stock",
					},
					{
						startValue: 400,
						endValue: 500,
						color: "#FEFB08",
						id: "wAdm1fy3Fmk",
						name: "Understock",
					},
				],
				id: "f1hWZIYCTzc",
				name: "Stock coverage time",
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
			legendSet: {
				legends: [
					{
						startValue: 0,
						endValue: 100,
						color: "#DC00FF",
						id: "wfbGANgbnMR",
						name: "Invalid",
					},
					{
						startValue: 100,
						endValue: 200,
						color: "#0011FF",
						id: "ee8QJxth4ul",
						name: "Overstock",
					},
					{
						startValue: 200,
						endValue: 300,
						color: "#EE391E",
						id: "fFBIEwglorN",
						name: "Stock out",
					},
					{
						startValue: 300,
						endValue: 400,
						color: "#0BFF00",
						id: "mmvDbIcm41d",
						name: "Adequate stock",
					},
					{
						startValue: 400,
						endValue: 500,
						color: "#FEFB08",
						id: "wAdm1fy3Fmk",
						name: "Understock",
					},
				],
				id: "f1hWZIYCTzc",
				name: "Stock coverage time",
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
export const Area: Story = {
	name: "Area",
	args: {
		analytics: multiSeriesData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "area",
		},
	},
};
export const StackedArea: Story = {
	name: "Stacked Area",
	args: {
		analytics: multiSeriesData as any,
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "stacked-area",
		},
	},
};

export const Radar: Story = {
	name: "Radar",
	args: {
		analytics: multiSeriesData as any,
		containerProps: {
			style: {
				width: "100%",
				height: "100%",
			},
		},
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "radar",
		},
	},
};
export const Scatter: Story = {
	name: "Scatter",
	args: {
		analytics: multiSeriesData as any,
		containerProps: {
			style: {
				width: "100%",
				height: "100%",
			},
		},
		config: {
			layout: {
				series: ["ou"],
				category: ["pe"],
				filter: ["dx"],
			},
			showFilterAsTitle: true,
			type: "scatter",
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

export const Gauge: Story = {
	name: "Gauge chart",
	args: {
		analytics: gaugeData as any,
		config: {
			layout: {
				series: ["dx"],
				category: [],
				filter: ["pe", "ou"],
			},
			showFilterAsTitle: true,
			type: "gauge",
		},
	},
};
export const GaugeWithLegendSet: Story = {
	name: "Gauge chart with legend set",
	args: {
		analytics: gaugeData as any,
		config: {
			layout: {
				series: ["dx"],
				category: [],
				filter: ["pe", "ou"],
			},
			legendSet: {
				name: "ANC Coverage",
				legends: [
					{
						name: "High Plus",
						startValue: 80,
						endValue: 90,
						color: "#FED976",
						id: "LHzMx7m1mo7",
					},
					{
						name: "Great",
						startValue: 90,
						endValue: 120,
						color: "#FFFFB2",
						id: "nFM35aXnjG4",
					},
					{
						name: "Medium Pl.",
						startValue: 50,
						endValue: 70,
						color: "#FD8D3C",
						id: "R09fMgqwz7l",
					},
					{
						name: "Medium",
						startValue: 30,
						endValue: 50,
						color: "#F03B20",
						id: "fyn331OKcrc",
					},
					{
						name: "Invalid",
						startValue: 120,
						endValue: 990,
						color: "#CCCCCC",
						id: "uLeRgauKbmk",
					},
					{
						name: "Low",
						startValue: 0,
						endValue: 30,
						color: "#BD0026",
						id: "YCSOboULcBM",
					},
					{
						name: "High",
						startValue: 70,
						endValue: 80,
						color: "#FEB24C",
						id: "XMzyLoC0hdi",
					},
				],
				displayName: "ANC Coverage",
				id: "fqs276KXCXi",
			},
			showFilterAsTitle: true,
			type: "gauge",
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
