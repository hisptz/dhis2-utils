import {Story} from "@storybook/react"
import React from "react";
import {CustomCheckboxField, CustomCheckboxFieldProps} from "./index";

const Template: Story<CustomCheckboxFieldProps> = (args) => <CustomCheckboxField {...args} />


export const Default = Template.bind({});
Default.args = {
    name: "Field",
    onChange: (value) => console.log(value),
    value: "true"
}

export default {
    title: "Form/Custom Checkbox Field",
    component: CustomCheckboxField,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
