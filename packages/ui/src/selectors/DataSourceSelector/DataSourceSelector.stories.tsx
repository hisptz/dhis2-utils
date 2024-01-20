import { Meta, StoryObj } from "@storybook/react";
import { DataSourceSelector } from "./DataSourceSelector";
import { useState } from "react";
import { SelectedDataItem } from "./types";

const meta: Meta<typeof DataSourceSelector> = {
	component: DataSourceSelector,
	title: "Selectors/Data Source Selector",
};

type Story = StoryObj<typeof DataSourceSelector>;

/**
 * If no data sources are specified, the selector will show a list of indicators in the system that the user has access to.
 *
 *
 * */
export const Default: Story = {
	name: "Default",
	args: {},
};

/**
 * The data selector supports `dataElements`, `indicators`, `sqlViews`,`programIndicators`, and `dataSets`.
 * To enable any of the dataSources, pass it in the `dataSources` array prop.
 * */
export const AvailableDataSources: Story = {
	name: "Available data sources",
	args: {
		dataSources: [
			"indicator",
			"programIndicator",
			"dataSet",
			"dataElement",
			"sqlView",
		],
	},
};

/** You can control the selected data items externally
 *
 * @example
 *
 * ```tsx
 * const [selected, setSelected] = useState<SelectedDataItem[]>([]);
 *
 * 		return (
 * 			<DataSourceSelector
 * 				selected={selected}
 * 				{...args}
 * 				onSelect={setSelected}
 * 			/>
 * 		);
 * ```
 *
 * */
export const ControlledExample: Story = {
	name: "Controlled",
	render: (args) => {
		const [selected, setSelected] = useState<SelectedDataItem[]>([]);

		return (
			<DataSourceSelector
				selected={selected}
				{...args}
				onSelect={setSelected}
			/>
		);
	},
	args: {
		dataSources: [
			"indicator",
			"programIndicator",
			"dataSet",
			"dataElement",
			"sqlView",
		],
	},
};

export default meta;
