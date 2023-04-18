import type {Story} from "@storybook/react";
import React from "react";
import {CalendarTypes} from "./components/PeriodSelect/constants/calendar";
import {PeriodSelectorProps} from "./types/props";
import {PeriodSelector} from "./index";
import {PeriodTypeEnum} from "@hisptz/dhis2-utils";

const Template: Story<PeriodSelectorProps> = (args, context) => <PeriodSelector {...args} {...context} />;

export const Default = Template.bind({});
Default.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
    enablePeriodSelector: true
};

export const WithAllowedFuturePeriods = Template.bind({});
WithAllowedFuturePeriods.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
    enablePeriodSelector: true
};

export const ExcludedFixedPeriodTypes = Template.bind({});
ExcludedFixedPeriodTypes.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
    excludedPeriodTypes: [],
    excludeFixedPeriods: true,
    enablePeriodSelector: true
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
    excludedPeriodTypes: [PeriodTypeEnum.DAILY, PeriodTypeEnum.MONTHLY,],
};

export const SingleSelection = Template.bind({});
SingleSelection.args = {
    onSelect: ({items}) => {
        console.log(items);
    },
    selectedPeriods: [],
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
    enablePeriodSelector: true,
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

export default {
    title: "Selectors/Period Selector",
    component: PeriodSelector,
    argTypes: {
        selectedPeriods: {
            control: "array",
        },
        calendar: {
            control: "radio",
            options: [CalendarTypes.GREGORIAN, CalendarTypes.ETHIOPIAN],
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
