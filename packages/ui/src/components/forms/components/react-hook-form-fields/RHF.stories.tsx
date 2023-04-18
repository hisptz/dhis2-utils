import {Story} from "@storybook/react";
import React from "react";
import {RHFDHIS2FormField, RHFDHIS2FormFieldProps} from "./RHFDHIS2FormField";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@dhis2/ui";

const Template: Story<RHFDHIS2FormFieldProps> = (args) => <RHFDHIS2FormField {...args} />;


export const TextField = Template.bind({});
TextField.args = {
    name: "text",
    valueType: "TEXT",
};
export const DateField = Template.bind({});
DateField.args = {
    name: "date",
    valueType: "DATE",
};

export const OrganisationUnitField = Template.bind({});
OrganisationUnitField.args = {
    name: "orgUnit",
    valueType: "ORGANISATION_UNIT",
};
export const RichTextField = Template.bind({});
RichTextField.args = {
    name: "orgUnit",
    valueType: "RICH_TEXT",
};
export const WithOptionSets = Template.bind({});
WithOptionSets.args = {
    name: "text",
    valueType: "TEXT",
    optionSet: {
        id: "string",
        options: [{
            id: "one",
            code: "one",
            name: "One"
        }]
    }
};

export const LegendMinMaxGroup = Template.bind({});
LegendMinMaxGroup.args = {
    name: "legends",
    valueType: "LEGEND_MIN_MAX_GROUP",
    min: 0,
    max: 100,
    highIsGood: false,
    legendDefinitions: [
        {
            name: "Hooray!",
            id: "perfect",
            color: "#0f630f"
        },
        {
            name: "Not bad",
            id: "not-bad",
            color: "#dcc211"
        },
        {
            name: "Um, yeah it's bad",
            id: "bad",
            color: "#ea0823"
        },
    ],
};

export const FileUploadField = Template.bind({});
FileUploadField.args = {
    name: "file",
    valueType: "FILE_RESOURCE",
};
export const WithValidations = Template.bind({});
WithValidations.args = {
    name: "text",
    valueType: "TEXT",
    validations: {
        required: "Field is required"
    }
};

export default {
    title: "Form/RHF Form fields",
    component: RHFDHIS2FormField,
    decorators: [
        (Story: any) => {
            const form = useForm();

            const onSubmit = (data: any) => {
                console.log(data);
            };
            return (
                <FormProvider {...form}>
                    <form style={{display: "flex", gap: 16, alignItems: "center"}}
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <Story/>
                        <Button type="submit">Submit</Button>
                    </form>
                </FormProvider>
            );

        }
    ]
};
