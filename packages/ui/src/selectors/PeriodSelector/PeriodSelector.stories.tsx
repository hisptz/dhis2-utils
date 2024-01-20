import { Meta, StoryObj } from "@storybook/react";
import { PeriodSelector } from "./PeriodSelector";

const meta: Meta<typeof PeriodSelector> = {
	title: "Selectors/Period Selector/Period Selector",
	component: PeriodSelector,
};

export default meta;

type Story = StoryObj<typeof PeriodSelector>;

/**
 * By default, the `PeriodSelector` only shows the `PeriodSelect` component.
 * */
export const Default: Story = {
	name: "Default",
	args: {},
};

/**
 * To show the date range component by default instead, set the `defaultInputType` to `dateRange` and `enableDateRange` to `true`
 * */

export const DateRange: Story = {
	name: "Date range as default",
	args: {
		defaultInputType: "dateRange",
		enableDateRange: true,
	},
};

/**
 * To show both `DateRange` and `PeriodSelect` selectors, set `enableDateRange` and `enablePeriodSelector` to `true`.
 * This will show a segmented control of the input types. The user can then select the input type based on the need.
 *
 * Note: Moving between the input selectors will clear all selections.
 *
 * */
export const ShowBothInputTypes: Story = {
	name: "Both input types",
	args: {
		enableDateRange: true,
		enablePeriodSelector: true,
	},
};
