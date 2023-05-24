import type {Story} from "@storybook/react";
import React from "react";
import {LegendDefinitionsFormField, LegendDefinitionsFormFieldProps} from "@hisptz/dhis2-ui";

const Template: Story<LegendDefinitionsFormFieldProps> = (args) => <LegendDefinitionsFormField {...args} />;

export const LegendDefinition = Template.bind({});

LegendDefinition.args = {
    shouldVerify: false,
    label: "Legend Definitions",
    name: "legendDefinitions",
    onChange: (values: any) => {
        console.log(values);
    },
    value: [],
};

export default {
    title: "Form/Custom Form Fields/Legend Definitions",
    component: LegendDefinition,
};
