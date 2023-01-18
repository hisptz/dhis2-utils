import {Story} from "@storybook/react"
import React from "react";
import {AgeField, AgeFieldProps} from "./index";

const Template: Story<AgeFieldProps> = (args) => <AgeField {...args} />


export const Default = Template.bind({});
Default.args = {
    name: "Field",
    onChange: (value) => console.log(value),
    value: "1996-05-27"
}

export default {
    title: "Form/Age Field",
    component: AgeField,
}
