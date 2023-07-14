import {Meta, StoryObj} from "@storybook/react"
import React from "react";
import {LegendDefinitionField, LegendDefinitionFieldProps} from "@hisptz/dhis2-ui";


type Story = StoryObj<typeof LegendDefinitionField>

export const Default: Story = {
    args: {
        name: "Field",
        onChange: (value: any) => console.log(value),
        value: ""
    }
}


const meta: Meta<LegendDefinitionFieldProps> = {
    title: "Form/Custom Form Fields/LegendDefinitionField",
    component: LegendDefinitionField,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
export default meta;
