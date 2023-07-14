import {Meta, StoryObj} from "@storybook/react"
import React from "react";
import {CustomOrgUnitProvider, OrgUnitSelectField, RichTextEditor, RichTextEditorProps} from "@hisptz/dhis2-ui";

type Story = StoryObj<typeof RichTextEditor>
export const Default: Story = {
    args: {
        name: "Field",
    }
}
export const WithValue: Story = {
    args: {
        name: "Field",
        value: "<p>Some rich <b>value</b> text</p>"
    }
}
const meta: Meta<RichTextEditorProps> = {
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
export default meta;
