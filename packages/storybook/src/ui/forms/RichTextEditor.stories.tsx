import {Story} from "@storybook/react"
import React from "react";
import {CustomOrgUnitProvider, OrgUnitSelectField, RichTextEditor, RichTextEditorProps} from "@hisptz/dhis2-ui";

const Template: Story<RichTextEditorProps> = (args) => <RichTextEditor {...args}  />

export const Default = Template.bind({});
Default.args = {
    name: "Field",
}
export const WithValue = Template.bind({});
WithValue.args = {
    name: "Field",
    value: "<p>Some rich <b>value</b> text</p>"
}

export default {
    title: "Form/Custom Form Fields/Rich Text field",
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
