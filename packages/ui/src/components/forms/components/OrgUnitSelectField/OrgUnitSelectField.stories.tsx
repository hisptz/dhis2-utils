import {Story} from "@storybook/react"
import React from "react";
import {OrgUnitSelectField, OrgUnitSelectFieldProps} from "./index";

const Template: Story<OrgUnitSelectFieldProps> = (args) => <OrgUnitSelectField {...args}  />

export const Default = Template.bind({});
Default.args = {
    name: "Field",

}

export default {
    title: "Form/Organisation unit field",
    component: OrgUnitSelectField,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
