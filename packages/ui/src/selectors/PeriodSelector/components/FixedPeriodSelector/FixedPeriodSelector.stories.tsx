import { Meta, StoryObj } from "@storybook/react";
import { FixedPeriodSelector } from "./FixedPeriodSelector";

const meta: Meta<typeof FixedPeriodSelector> = {
	title: "Selectors/Period Selector/Fixed Period Selector",
	component: FixedPeriodSelector,
};

export default meta;

type Story = StoryObj<typeof FixedPeriodSelector>;

export const Default: Story = {
	name: "Default",
	args: {},
};

/**
 * You can also include future periods by setting `allowFuturePeriods` prop to `true`
 * */
export const FuturePeriods: Story = {
	name: "Future periods",
	args: {
		allowFuturePeriods: true,
	},
};
