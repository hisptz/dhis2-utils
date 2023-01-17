import {InputField} from "./index";
import type {Story} from "@storybook/react"
import React from "react";

const Template: Story = (args) => <InputField {...args} />


export const Default = Template.bind({});
Default.args = {
    label: "Default!"
}


export default {
    title: "UI/Forms/InputField",
    component: InputField,
}
