import {Story} from "@storybook/react"
import React from "react";
import {LegendDefinitionField} from "@hisptz/dhis2-ui";

const Template: Story<any> = (args) => <LegendDefinitionField {...args} />

export const Default = Template.bind({});
Default.args = {
    name: "Field",
    onChange: (value: any) => console.log(value),
    value: ""
}

export default {
    title: "Form/Custom Form Fields/LegendDefinitionField",
    component: LegendDefinitionField,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
