import simpleData from "../../shared/resources/simple-data.json";
import { Meta, StoryObj } from "@storybook/react";
import { DHIS2PivotTable } from "./DHIS2PivotTable";

const legendSet = {
	legends: [
		{
			startValue: 80.0,
			endValue: 90.0,
			color: "#FED976",
			id: "LHzMx7m1mo7",
			name: "High Plus",
		},
		{
			startValue: 90.0,
			endValue: 120.0,
			color: "#FFFFB2",
			id: "nFM35aXnjG4",
			name: "Great",
		},
		{
			startValue: 50.0,
			endValue: 70.0,
			color: "#FD8D3C",
			id: "R09fMgqwz7l",
			name: "Medium Pl.",
		},
		{
			startValue: 30.0,
			endValue: 50.0,
			color: "#F03B20",
			id: "fyn331OKcrc",
			name: "Medium",
		},
		{
			startValue: 120.0,
			endValue: 990.0,
			color: "#CCCCCC",
			id: "uLeRgauKbmk",
			name: "Invalid",
		},
		{
			startValue: 0.0,
			endValue: 30.0,
			color: "#BD0026",
			id: "YCSOboULcBM",
			name: "Low",
		},
		{
			startValue: 70.0,
			endValue: 80.0,
			color: "#FEB24C",
			id: "XMzyLoC0hdi",
			name: "High",
		},
	],
	id: "fqs276KXCXi",
	name: "ANC Coverage",
};

const meta: Meta<typeof DHIS2PivotTable> = {
	title: "DHIS2 Pivot Table",
	component: DHIS2PivotTable,
};

export default meta;

type Story = StoryObj<typeof DHIS2PivotTable>;
export const Default: Story = {
	name: "Default",
};
Default.args = {
	analytics: simpleData as any,
	config: {
		layout: {
			columns: [
				{ dimension: "ou" },
				{ dimension: "pe", label: "Period" },
			],
			rows: [{ dimension: "dx", label: "Services" }],
		},
		options: {
			showFilterAsTitle: true,
		},
	},
	tableProps: {},
};
export const WithLegendSet: Story = {
	name: "With Fixed Legend Set",
};
WithLegendSet.args = {
	analytics: simpleData as any,
	config: {
		layout: {
			columns: [
				{ dimension: "ou" },
				{ dimension: "pe", label: "Period" },
			],
			rows: [{ dimension: "dx", label: "Services" }],
		},
		options: {
			showFilterAsTitle: true,
			legend: {
				showKey: false,
				style: "FILL",
				strategy: "FIXED",
				set: legendSet,
			},
		},
	},
	tableProps: {},
};

export const WithByItemLegendSet: Story = {
	name: "With By Item Legend Set",
};
WithByItemLegendSet.args = {
	analytics: simpleData as any,
	config: {
		layout: {
			columns: [
				{ dimension: "ou" },
				{ dimension: "pe", label: "Period" },
			],
			rows: [{ dimension: "dx", label: "Services" }],
		},
		options: {
			showFilterAsTitle: true,
			legend: {
				showKey: false,
				style: "FILL",
				strategy: "BY_DATA_ITEM",
				legendMap: new Map([["b69S1KvmO0a", legendSet]]),
			},
		},
	},
	tableProps: {},
};

export const WithTextLegendSet: Story = {
	name: "With Text Legend Set",
};
WithTextLegendSet.args = {
	analytics: simpleData as any,
	config: {
		layout: {
			columns: [
				{ dimension: "ou" },
				{ dimension: "pe", label: "Period" },
			],
			rows: [{ dimension: "dx", label: "Services" }],
		},
		options: {
			showFilterAsTitle: true,
			legend: {
				showKey: false,
				style: "TEXT",
				strategy: "FIXED",
				set: legendSet,
			},
		},
	},
	tableProps: {},
};
