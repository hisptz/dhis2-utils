import {Story} from "@storybook/react"
import React from "react";
import {Legend, LegendMinMax, LegendMinMaxProps} from "@hisptz/dhis2-ui";

const Template: Story<LegendMinMaxProps> = (args) => <LegendMinMax {...args} />

export const Default = Template.bind({});
Default.args = {
    name: "Field",
    legendDefinition: {
        name: "Hooray!",
        id: "perfect",
        color: "#0f630f"
    },
    onChange: (value) => console.log(value),
    value: new Legend({
        id: "legend",
        legendDefinitionId: "definition-id"
    })
}

export default {
    title: "Form/Custom Form Fields/Legend MinMax Field",
    component: LegendMinMax,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
