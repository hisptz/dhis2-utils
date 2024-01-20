import { Meta, StoryObj } from "@storybook/react";
import DateRange from "./DateRange";

const meta: Meta<typeof DateRange> = {
	title: "Selectors/Period Selector/Date Range",
	component: DateRange,
};

export default meta;

type Story = StoryObj<typeof DateRange>;

export const Default: Story = {
	name: "Default",
	args: {},
};

/**
 * By default, the date range does not allow future dates. You can disable this feature by setting `allowFuturePeriods` to `true`
 * */
export const AllowFuturePeriods: Story = {
	name: "Allow future periods",
	args: {
		allowFuturePeriods: true,
	},
};
