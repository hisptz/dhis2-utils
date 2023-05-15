import type {Story} from "@storybook/react";
import React from "react";
import {DataSourceSelector, DataSourceSelectorProps} from "@hisptz/dhis2-ui";

const Template: Story<DataSourceSelectorProps> = (args) => <DataSourceSelector {...args} />;

export const IndicatorSelector = Template.bind({});
IndicatorSelector.args = {
    onSelect: (data) => {
        console.log(data);
    },
    dataSources: [],
    maxSelections: "Infinity",
};
export const WithMaxSelection = Template.bind({});
WithMaxSelection.args = {
    onSelect: (data) => {
        console.log(data);
    },
    maxSelections: 1,
};

export const WithAllAvailableDataSources = Template.bind({});
WithAllAvailableDataSources.args = {
    onSelect: (data) => {
        console.log(data);
    },
    maxSelections: 1,
    dataSources: ["dataSet", "customFunction", "indicator", "programIndicator", "dataElement"],
};

export default {
    title: "Selectors/Data Source Selector",
    component: DataSourceSelector,
    decorators: [
        (DataSourceSelectorStory: any) => (
            <div className="row w-100 center">
                <div style={{width: 600}}>
                    <DataSourceSelectorStory/>
                </div>
            </div>
        ),
    ],
    argTypes: {
        maxSelections: {
            control: "radio",
            options: [1, "Infinity"],
        },
    },
};