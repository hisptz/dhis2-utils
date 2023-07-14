import {Meta, StoryObj} from "@storybook/react"
import React from "react";
import {Legend, LegendMinMax, LegendMinMaxProps} from "@hisptz/dhis2-ui";

type Story = StoryObj<typeof LegendMinMax>

export const Default: Story = {
    args: {
        name: "Field",
        legendDefinition: {
            name: "Hooray!",
            id: "perfect",
            color: "#0f630f"
        },
        onChange: (value: any) => console.log(value),
        value: new Legend({
            id: "legend",
            legendDefinitionId: "definition-id"
        })
    }
}
const meta: Meta<LegendMinMaxProps> = {
    title: "Form/Custom Form Fields/Legend MinMax Field",
    component: LegendMinMax,
    argTypes: {
        onChange: {
            action: "changed"
        }
    }
}
export default meta;
