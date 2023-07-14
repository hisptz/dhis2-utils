import {Meta, Story, StoryObj} from "@storybook/react"
import React from "react";
import {CustomOrgUnitProvider, OrgUnitSelectField, OrgUnitSelectFieldProps} from "@hisptz/dhis2-ui";


type Story = StoryObj<typeof OrgUnitSelectField>;


export const Default: Story = {
    args: {
        name: "Field",
    }
}
export const WithValue: Story = {
    args: {
        name: "Field",
        value: "OI0BQUurVFS"
    }
}
const meta: Meta<OrgUnitSelectFieldProps> = {
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
export default meta;
