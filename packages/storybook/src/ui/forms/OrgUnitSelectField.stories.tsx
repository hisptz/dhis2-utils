import {Story} from "@storybook/react"
import React from "react";
import {CustomOrgUnitProvider, OrgUnitSelectField, OrgUnitSelectFieldProps} from "@hisptz/dhis2-ui";

const Template: Story<OrgUnitSelectFieldProps> = (args) => <OrgUnitSelectField {...args}  />

export const Default = Template.bind({});
Default.args = {
    name: "Field",

}
export const WithValue = Template.bind({});
WithValue.args = {
    name: "Field",
    value: "OI0BQUurVFS"
}

export default {
    title: "Form/Custom Form Fields/Organisation unit field",
    component: OrgUnitSelectField,
    decorators: [
        (Story: any) => {
            return (
                <CustomOrgUnitProvider>
                    <Story/>
                </CustomOrgUnitProvider>
            )
        }
    ],
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
