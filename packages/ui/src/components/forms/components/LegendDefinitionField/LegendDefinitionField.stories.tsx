import {Story} from "@storybook/react"
import React from "react";
import {FieldProps} from "../../interfaces";
import {LegendDefinitionField} from "./index";

const Template: Story<FieldProps> = (args) => <LegendDefinitionField {...args} />

export const Default = Template.bind({});
Default.args = {
    name: "Field",
    onChange: (value) => console.log(value),
    value: ""
}

export default {
    title: "Form/LegendDefinitionField",
    component: LegendDefinitionField,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
