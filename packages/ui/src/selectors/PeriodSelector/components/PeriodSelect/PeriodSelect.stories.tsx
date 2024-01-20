import { Meta, StoryObj } from "@storybook/react";
import PeriodSelect from "./PeriodSelect";
import { useState } from "react";

const meta: Meta<typeof PeriodSelect> = {
	title: "Selectors/Period Selector/Period Select",
	component: PeriodSelect,
};

export default meta;

type Story = StoryObj<typeof PeriodSelect>;

export const Default: Story = {
	name: "Default",
};

/** The `PeriodSelect` allows you to exclude some period types by using the `excludePeriodTypes` prop.
 * */
export const ExcludePeriodTypes: Story = {
	name: "Exclude period types",
	args: {
		excludedPeriodTypes: ["MONTHLY", "DAILY"],
	},
};

/**
 * You can also exclude either fixed periods or relative periods by passing the `excludeFixedPeriod` or `excludeRelativePeriod` props respectively.
 * */
export const ExcludeRelativeOrFixed: Story = {
	name: "Exclude relative or fixed",
	args: {
		excludeFixedPeriods: true,
	},
};

/**
 * You can limit the selection to only one selection at a time using the `singleSelection` prop
 *
 *
 * */
export const SingleSelection: Story = {
	name: "Single selection",
	args: {
		singleSelection: true,
	},
	render: (args) => {
		const [selected, setSelected] = useState<string[]>([]);

		return (
			<PeriodSelect
				{...args}
				selectedPeriods={selected}
				onSelect={({ items }) => setSelected(items)}
			/>
		);
	},
};

/**
 * By default, the selector will only show present and past periods. To display future periods set the `allowFuturePeriods` prop to `true`
 *
 *
 * */

export const FuturePeriods: Story = {
	name: "Future periods",
	args: {
		allowFuturePeriods: true,
	},
};
