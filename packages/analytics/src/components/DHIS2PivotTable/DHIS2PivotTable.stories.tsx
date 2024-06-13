import simpleData from "../../shared/resources/simple-data.json";
import { Meta, StoryObj } from "@storybook/react";
import { DHIS2PivotTable } from "./DHIS2PivotTable";

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
