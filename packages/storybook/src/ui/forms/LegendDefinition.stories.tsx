import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {LegendDefinitionsFormField, LegendDefinitionsFormFieldProps} from "@hisptz/dhis2-ui";


type Story = StoryObj<LegendDefinitionsFormFieldProps>;
export const LegendDefinition: Story = {
    args: {
        shouldVerify: false,
        label: "Legend Definitions",
        name: "legendDefinitions",
        onChange: (values: any) => {
            console.log(values);
        },
        value: [],
    }
}


const meta: Meta<LegendDefinitionsFormFieldProps> = {
    title: "Form/Custom Form Fields/Legend Definitions",
    component: LegendDefinitionsFormField,
}

export default meta;
