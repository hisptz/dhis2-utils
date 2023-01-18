import {Story} from "@storybook/react"
import React from "react";
import {AgeField} from "./index";
import {FieldProps} from "../../interfaces";

const Template: Story<FieldProps> = (args) => <AgeField {...args} />


export const Default = Template.bind({});
Default.args = {
    name: "Field",
    onChange: (value) => console.log(value),
    value: "1996-05-27"
}

export default {
    title: "Form/AgeField",
    component: AgeField,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
