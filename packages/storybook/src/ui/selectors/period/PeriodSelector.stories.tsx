import type {Story} from "@storybook/react";
import React from "react";
import {ModalProps, PeriodSelector, PeriodSelectorModal, PeriodSelectorProps} from "@hisptz/dhis2-ui";

const Template: Story<PeriodSelectorProps> = (args, context) => <PeriodSelector {...args} {...context} />;

const ModalTemplate: Story<ModalProps & PeriodSelectorProps> = (args) => <PeriodSelectorModal {...args} />;


export const Default = Template.bind({});
Default.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
};

export const WithAllowedFuturePeriods = Template.bind({});
WithAllowedFuturePeriods.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
};

export const ExcludedFixedPeriodTypes = Template.bind({});
ExcludedFixedPeriodTypes.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
    excludeFixedPeriods: true,
};

export const ExcludedRelativePeriodTypes = Template.bind({});
ExcludedRelativePeriodTypes.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
    excludeRelativePeriods: true,
};

export const ExcludedPeriodTypes = Template.bind({});
ExcludedPeriodTypes.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: ["RelativeWeek", "RelativeMonth", "Monthly", "Weekly"],
};

export const SingleSelection = Template.bind({});
SingleSelection.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: ["RelativeWeek", "RelativeMonth", "Monthly", "Weekly"],
};

export const SelectedDateRangePeriod = Template.bind({});
SelectedDateRangePeriod.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    enableDateRange: true,
    selectedPeriods: [
        {
            startDate: "2022-01-01",
            endDate: "2022-12-31",
            type: "RANGE",
        },
    ],
    excludedPeriodTypes: [],
};
export const SelectedPeriods = Template.bind({});
SelectedPeriods.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    enableDateRange: true,
    selectedPeriods: ["2022"],
    excludedPeriodTypes: [],
};

export const DateRange = Template.bind({});
DateRange.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    enableDateRange: true,
    selectedPeriods: [],
    excludedPeriodTypes: [],
    defaultInputType: "dateRange",
};
export const DateRangeWithFutureAllowed = Template.bind({});
DateRangeWithFutureAllowed.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    enableDateRange: true,
    selectedPeriods: [],
    excludedPeriodTypes: [],
    defaultInputType: "dateRange",
    allowFuturePeriods: true
};

export const Modal = ModalTemplate.bind({});
Modal.args = {
    hide: true,
    onClose: () => {
        console.log("onClose");
    },
    onUpdate: (value) => console.log(value),
    singleSelection: true,
    enableDateRange: true,
    enablePeriodSelector: true,

};


export default {
    title: "Selectors/Period Selector",
    component: [PeriodSelector, PeriodSelectorModal],
    argTypes: {
        selectedPeriods: {
            control: "array",
        },
        calendar: {
            control: "radio",
            options: [],
        },
    },
    decorators: [
        (Story: any) => {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <Story/>
                </div>
            );
        },
    ],
};
