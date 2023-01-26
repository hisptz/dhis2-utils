import {Story} from "@storybook/react"
import React from "react";
import {FixedPeriodSelector, FixedPeriodSelectorProps} from "./index";

const Template: Story<FixedPeriodSelectorProps> = (args) => <FixedPeriodSelector {...args} />


export const Default = Template.bind({});
Default.args = {
    onSelect: ({items}) => console.log(items),
    allowFuturePeriods: true,
}

export const WithValue = Template.bind({});
WithValue.args = {
    onSelect: ({items}) => console.log(items),
    allowFuturePeriods: true,
    selectedPeriods: ['202205']
}

export default {
    title: "Selectors/Fixed Period Selector",
    component: FixedPeriodSelector,
    argTypes: {
        onSelect: {
            action: "changed"
        }
    }
}
