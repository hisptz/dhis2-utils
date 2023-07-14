import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {DataSourceSelector, DataSourceSelectorProps} from "@hisptz/dhis2-ui";


type Story = StoryObj<typeof DataSourceSelector>;

export const IndicatorSelector: Story = {
    args: {
        selected: [],
        onSelect: (data) => {
            console.log(data);
        },
        dataSources: [],
        maxSelections: "Infinity",
    }
}
export const WithMaxSelection: Story = {
    args: {
        selected: [],
        onSelect: (data) => {
            console.log(data);
        },
        maxSelections: 1,
    }
}
export const WithAllAvailableDataSources: Story = {
    args: {
        selected: [],
        onSelect: (data) => {
            console.log(data);
        },
        maxSelections: 1,
        dataSources: ["dataSet", "customFunction", "indicator", "programIndicator", "dataElement", "sqlView"],
    }
}
const meta: Meta<DataSourceSelectorProps> = {
    title: "Selectors/Data Source Selector",
    parameters: {
        jsx: {}
    },
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
export default meta;
